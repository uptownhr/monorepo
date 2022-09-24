//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import * as HttpErrors from 'http-errors';
import { Model, PipelineStage, Types } from 'mongoose';
import type { TokenSet, UserinfoResponse } from 'openid-client';
import { Company, CompanyDocument } from '../../core-company/schemas/core-company.schema';
import { User, UserDocument } from '../../core-user/schemas/user.schema';
import type { CoreAuthInternalDTO } from '../dto/core-auth-internal.dto';
import { Auth, AuthDocument } from '../schemas/core-auth.schema';

type AuthAggregateResponse = AuthDocument & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  auth_users: Array<UserDocument & { auth_user_company?: CompanyDocument }>;
};
@Injectable()
export class CoreAuthInternalRepository {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async createAuth(email: string, opts: { userId?: string } = {}): Promise<string> {
    const data = {
      email,
      username: email,
      _user: opts.userId ? new Types.ObjectId(opts.userId) : undefined,
    };

    const auth = await this.authModel.create(data);

    return auth._id.toString();
  }

  public async getById(authId: string): Promise<CoreAuthInternalDTO | null> {
    return this.#getWithMatch({ $match: { _id: new ObjectId(authId) } });
  }

  // todo: this is actually getByCurrentUserId
  public async getByUserId(userId: string): Promise<CoreAuthInternalDTO | null> {
    return this.#getWithMatch({ $match: { _user: new ObjectId(userId) } });
  }

  public async getByEmail(email: string): Promise<CoreAuthInternalDTO | null> {
    return this.#getWithMatch({ $match: { email: email.toLowerCase() } });
  }

  public async getByUsername(username: string): Promise<CoreAuthInternalDTO | null> {
    return this.#getWithMatch({ $match: { username: username.toLowerCase() } });
  }

  public async switchLoginUser(authId, userId) {
    const state = await this.#getWithMatch({ $match: { _id: new ObjectId(authId) } });
    const newUser = state?.userOptions.find((o) => o.userId === userId);

    if (!newUser) {
      // 404
      throw new HttpErrors[404](`User not found ${userId}`);
    } else if (!newUser.active) {
      // 412
      throw new HttpErrors[412](`User not active ${userId}`);
    }

    await this.authModel.updateOne(
      {
        _id: new ObjectId(authId),
      },
      {
        $set: {
          _user: new ObjectId(userId),
        },
      },
    );
  }

  public async switchLoginCompany(authId, companyId) {
    const state = await this.#getWithMatch({ $match: { _id: new ObjectId(authId) } });
    const newUser = state?.userOptions.find((o) => o.companyId === companyId);
    if (!newUser) {
      // 404
      throw new HttpErrors[404](`User not found ${companyId}`);
    } else if (!newUser.active) {
      // 412
      throw new HttpErrors[412](`User not active ${companyId}`);
    }

    await this.authModel.updateOne(
      {
        _id: new ObjectId(authId),
      },
      {
        $set: {
          _user: new ObjectId(newUser.userId),
        },
      },
    );
  }

  async updateOauthData(authId: string, provider: string, tokens: TokenSet, userInfo: UserinfoResponse) {
    if (provider === 'bambee-gsuite') {
      provider = 'google';
    }
    const authRecord = await this.authModel.findById({
      _id: new ObjectId(authId),
    });
    if (!authRecord) {
      throw new HttpErrors[404](`Auth ${authId} not found`);
    }
    const identity = authRecord.oauth_identities?.find((i) => i.kind === provider);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const oauth_identities = {
      kind: provider,
      tokens: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        access_token: tokens.access_token!,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        refresh_token: tokens.refresh_token!,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        id_token: tokens.id_token!,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        token_type: tokens.token_type!,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        expiry_date: new Date(tokens.expires_at!),
      },
      profile: {
        email: userInfo.email!,
        id: userInfo.sub!,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        avatar_url: userInfo.picture!,
        name: userInfo.name!,
      },
    };
    if (!identity) {
      await this.authModel.updateOne(
        {
          _id: new ObjectId(authId),
        },
        {
          $addToSet: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            oauth_identities,
          },
        },
      );
    } else {
      await this.authModel.updateOne(
        {
          _id: new ObjectId(authId),
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'oauth_identities.kind': provider,
        },
        {
          $update: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'oauth_identities.$': oauth_identities,
          },
        },
      );
    }
  }

  async #getWithMatch(match: PipelineStage.Match): Promise<CoreAuthInternalDTO | null> {
    const pipeline: PipelineStage[] = [
      match,
      {
        $lookup: {
          from: 'users',
          as: 'auth_users',
          let: { authId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_auth', '$$authId'] } } },
            {
              $lookup: {
                from: 'companies',
                as: 'auth_user_company',
                localField: '_company',
                foreignField: '_id',
              },
            },
            {
              $unwind: {
                path: '$auth_user_company',
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },
    ];
    const aggregateResponse = await this.authModel.aggregate<AuthAggregateResponse>(pipeline);
    if (!aggregateResponse.length) {
      return null;
    }

    const agg = aggregateResponse[0];
    const currentUser = agg.auth_users.find((u) => u._id.equals(agg._user));
    if (!currentUser) {
      throw new HttpErrors[412](`Auth ${agg._id.toString()} is missing a user`);
    }
    const authDoc = new this.authModel(agg);
    const userDoc = new this.userModel(currentUser);
    const companyDoc = currentUser?.auth_user_company && new this.companyModel(currentUser.auth_user_company);
    const userOptions = agg.auth_users.map((user) => ({
      user: new this.userModel(user),
      company: new this.companyModel(user.auth_user_company),
    }));
    return mapToResponseDto(authDoc, userDoc, companyDoc, userOptions);
  }

  async setPassowrdResetState(authId: string, token: string) {
    return this.authModel.findByIdAndUpdate(new ObjectId(authId), {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      $set: { activation_status: 'password-reset', token },
    });
  }
}

function mapToResponseDto(
  authDoc: AuthDocument,
  userDoc: UserDocument,
  companyDoc: CompanyDocument | undefined,
  userOptions: Array<{ user: UserDocument; company: CompanyDocument }>,
): CoreAuthInternalDTO {
  const roles = [userDoc.role];
  if (companyDoc?._id.equals(userDoc._id)) {
    roles.push(UserRole.CompanyOwner);
  }
  return {
    id: authDoc._id.toString(),
    email: authDoc.email,
    passwordHash: authDoc.password!,
    fullName: userDoc.profile.first_name + ' ' + userDoc.profile.last_name,
    currentUserId: userDoc._id.toString(),
    currentCompanyId: companyDoc?._id.toString(),
    roles,
    primaryRole: userDoc.role,
    authActive: authDoc.active ?? false,
    avatarUr: userDoc.profile.avatar_url,
    userActive: userDoc.active,
    userOptions: userOptions.map(({ user, company }) => ({
      companyId: company._id.toString(),
      companyName: company.name,
      userId: user._id.toString(),
      active: user.active,
    })),
  };
}

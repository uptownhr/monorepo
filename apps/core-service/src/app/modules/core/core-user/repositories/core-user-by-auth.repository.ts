//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, PipelineStage } from 'mongoose';
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import { Company, CompanyDocument } from '../../core-company/schemas/core-company.schema';
import type { CoreUserDTO } from '../dto';
import { User, UserDocument } from '../schemas/user.schema';
import { mapUserdocToUserDTO } from './lib/map-userdoc-to-userdto';

@Injectable()
export class CoreUserByAuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async getByAuthId(authId: string): Promise<CoreUserDTO | null> {
    return this.#getByMatch({ $match: { _id: new ObjectId(authId) } })[0] ?? null;
  }

  public async getByAuthIds(authIds: readonly string[]): Promise<Array<CoreUserDTO>> {
    return this.#getByMatch({ $match: { _id: { $in: authIds.map((id) => new ObjectId(id)) } } });
  }

  public async getByEmail(email: string) {
    return this.#getByMatch({ $match: { email } });
  }

  async #getByMatch(matcher: PipelineStage.Match): Promise<Array<CoreUserDTO>> {
    const pipeline: PipelineStage[] = [
      matcher,
      {
        $lookup: {
          from: 'users',
          as: 'auth_user',
          localField: '_user',
          foreignField: '_id',
        },
      },
      {
        $lookup: {
          from: 'companies',
          as: 'auth_company',
          localField: 'auth_user._company',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$auth_user',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$auth_company',
        },
      },
    ];
    const authAggregate = await this.userModel.aggregate(pipeline);

    if (!authAggregate?.length) {
      return [];
    }

    return authAggregate.map((auth) => {
      const userDoc = new this.userModel(auth.auth_user);
      const authDoc = new this.authModel(auth);
      const companyDoc = new this.companyModel(auth.auth_company);
      return mapUserdocToUserDTO(userDoc, authDoc, companyDoc);
    });
  }
}

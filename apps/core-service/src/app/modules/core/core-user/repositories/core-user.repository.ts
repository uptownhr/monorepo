//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, PipelineStage } from 'mongoose';
import * as UIDGenerator from 'uid-generator';
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import { Company, CompanyDocument } from '../../core-company/schemas/core-company.schema';
import type { CoreUserDTO } from '../dto';
import type { CoreUserConsumableTokenDTO } from '../dto/core-user-consumable-token.dto';
import { ConsumableToken, ConsumableTokenDocument } from '../schemas/consumableToken.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { mapToConsumableTokenDTO } from './lib/map-consumabletoken-to-dto';
import { mapUserdocToUserDTO } from './lib/map-userdoc-to-userdto';

@Injectable()
export class CoreUserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(ConsumableToken.name) private consumableTokenModel: Model<ConsumableTokenDocument>,
  ) {}

  public async getById(userId: string): Promise<CoreUserDTO | null> {
    const res = await this.getByIds([userId]);
    return res?.[0] ?? null;
  }

  public async getByIds(userIds: readonly string[]): Promise<Array<CoreUserDTO>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#getByMatch({ $match: { _id: { $in: userIds.map((u) => new ObjectId(u)) } as any } });
  }

  async getByCompanyIds(companyIds: readonly string[]): Promise<{ [companyId: string]: CoreUserDTO[] }> {
    const fullSet = await this.#getByMatch({
      $match: { _company: { $in: companyIds.map((c) => new ObjectId(c)) } },
    });

    return fullSet.reduce((agg, user) => {
      if (!user.companyId) {
        return agg;
      }
      if (!agg[user.companyId]) {
        agg[user.companyId] = [];
      }
      agg[user.companyId].push(user);
      return agg;
    }, {});
  }

  async #getByMatch(match: PipelineStage.Match) {
    /**
     * Population is orders of magnitude more expensive than building an aggregate query, as
     * population happens in Node, not on the mongo server.
     *
     * Instead of population, build an explicit aggregate, and create documents using `new this.authModel()/new this.companyModel()`
     *
     * Also, ensure the indices are correct as well!
     */
    const pipeline: PipelineStage[] = [
      match,
      {
        $lookup: {
          from: 'auths',
          as: 'user_auth',
          localField: '_auth',
          foreignField: '_id',
        },
      },
      {
        $lookup: {
          from: 'companies',
          as: 'user_company',
          localField: '_company',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$user_auth',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$user_company',
        },
      },
    ];
    const userAggregate = await this.userModel.aggregate(pipeline);

    if (!userAggregate?.length) {
      return [];
    }

    return userAggregate.map((u) => {
      const userDoc = new this.userModel(u);
      const authDoc = new this.authModel(u.user_auth);
      const companyDoc = new this.companyModel(u.user_company);
      return mapUserdocToUserDTO(userDoc, authDoc, companyDoc);
    });
  }

  async getDirectReportIds(userId: string): Promise<string[]> {
    const res = await this.userModel.find({ _manager: userId });
    return res.map((r) => r._id.toString());
  }

  async getConsumableTokenByAuthId(authId: string): Promise<CoreUserConsumableTokenDTO | null> {
    const now = new Date();
    const consumableToken = await this.consumableTokenModel.findOne({
      _user: authId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expires_at: { $gt: now },
      active: true,
    });
    if (!consumableToken) return null;
    return mapToConsumableTokenDTO(consumableToken);
  }

  async getConsumableTokenByToken(token: string): Promise<CoreUserConsumableTokenDTO | null> {
    const consumableToken = await this.consumableTokenModel.findOne({
      token,
    });
    if (!consumableToken) return null;
    return mapToConsumableTokenDTO(consumableToken);
  }

  async createConsumableToken(
    authId: string,
    createdByAuthId: string,
    expiresAt: Date,
  ): Promise<CoreUserConsumableTokenDTO> {
    const uidgen = new UIDGenerator(64);
    const token = uidgen.generateSync();
    const consumableToken = new this.consumableTokenModel({
      token,
      _user: new ObjectId(authId),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _created_by: createdByAuthId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expires_at: expiresAt,
    });
    await consumableToken.save();
    return mapToConsumableTokenDTO(consumableToken);
  }

  async updateConsumableTokenExpiration(id: string, expiresAt: Date) {
    await this.consumableTokenModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          expires_at: expiresAt,
        },
      },
      {
        upsert: false,
      },
    );
  }

  async setAuthReference(userId: string, authId: string): Promise<void> {
    await this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          _auth: authId,
        },
      },
      {
        upsert: false,
      },
    );
  }

  async #save(doc: UserDocument) {
    if (doc.profile?.pay_rate?.includes('$')) {
      doc.profile.pay_rate = doc.profile.pay_rate.substring(1);
      doc.markModified('profile');
    }
    return doc.save();

    /**
     *   TODO
     *  The following should be service code when a user is deactivated.
     * The purpose of this function is:
     *  - mark any 'in-progress' documents for the user as "deleted".  See the DeletionSchema
     *  - remove any of these documents from showing up in any policies or policy counts.

      if (this.isModified('active') && !this.active) {
        // If user turns inactive (user.active is false), then remove his/her documents from policy
        await this.populate('_company').execPopulate();
        if (this._company) {
          await this._company
            .populate({
              path: '_policies',
              model: 'Policy',
              populate: {
                path: '_documents',
                model: 'Document',
              },
            })
            .execPopulate();

          const policiesInProgress = this._company._policies.filter((p) => p.status === 'in-progress');
          const saveArr = policiesInProgress.map((p) => {
            p._documents = p._documents.filter((d) => !(d._employee.equals(this._id) && !d.signed));
            p.signed();
            return p.save();
          });

          await Promise.all(saveArr);
        }
      }
    */
  }
}

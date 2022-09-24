//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import type { CoreUserDTO } from '../../core-user/dto';
import { mapUserdocToUserDTO } from '../../core-user/repositories/lib/map-userdoc-to-userdto';
import { User, UserDocument } from '../../core-user/schemas/user.schema';
import { CompanyV1EmploymentType } from '../models';
import { Company, CompanyDocument } from '../schemas/core-company.schema';
import type { GetEmployeesOptions } from '../types';

@Injectable()
export class CompanyUsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async getCompanyCoreUsers(companyId: string, options: GetEmployeesOptions): Promise<Array<CoreUserDTO>> {
    const filter: FilterQuery<UserDocument> = {
      _company: new ObjectId(companyId),
      role: { $in: [UserRole.Employee, UserRole.User] },
    };

    if (options.employmentType === CompanyV1EmploymentType.W2) {
      filter['profile.contractor'] = false;
    } else if (options.employmentType === CompanyV1EmploymentType.Contractor) {
      filter['profile.contractor'] = true;
    }

    const pipeline: PipelineStage[] = [
      { $match: filter },
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
}

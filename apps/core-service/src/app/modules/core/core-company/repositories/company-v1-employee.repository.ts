//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import { User, UserDocument } from '../../core-user/schemas/user.schema';
import { mapEmployeeToBody } from '../lib/map-employee-to-response';
import { CompanyV1EmployeeBody, CompanyV1EmploymentType } from '../models';
import type { GetEmployeesOptions } from '../types';

@Injectable()
export class CompanyV1EmployeeRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
  ) {}

  async getCompanyEmployees(companyId: string, options: GetEmployeesOptions): Promise<CompanyV1EmployeeBody[]> {
    const filter: FilterQuery<UserDocument> = {
      _company: new ObjectId(companyId),
      role: { $in: [UserRole.Employee, UserRole.User] },
    };

    if (options.employmentType === CompanyV1EmploymentType.W2) {
      filter['profile.contractor'] = false;
    } else if (options.employmentType === CompanyV1EmploymentType.Contractor) {
      filter['profile.contractor'] = true;
    }
    if (options.role) {
      filter.role = options.role; // Overwrites the above set default
    }
    if (options.active) {
      filter.active = options.active;
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
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$user_auth',
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
      return mapEmployeeToBody(userDoc, { [authDoc._id.toString()]: authDoc.email });
    });
  }

  async getCompanyEmployeesByUserIds(companyId: string, userIds: string[]): Promise<CompanyV1EmployeeBody[]> {
    const filter: FilterQuery<UserDocument> = {
      _company: new ObjectId(companyId),
      // role: { $in: [UserRole.Employee, UserRole.User] },
      _id: { $in: userIds.map((u) => new ObjectId(u)) },
    };

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
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$user_auth',
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
      return mapEmployeeToBody(userDoc, { [authDoc._id.toString()]: authDoc.email });
    });
  }

  async getEmployeesByUserIds(userIds: string[]): Promise<CompanyV1EmployeeBody[]> {
    const filter: FilterQuery<UserDocument> = {
      // role: { $in: [UserRole.Employee, UserRole.User] },
      _id: { $in: userIds.map((u) => new ObjectId(u)) },
    };

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
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$user_auth',
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
      return mapEmployeeToBody(userDoc, { [authDoc._id.toString()]: authDoc.email });
    });
  }
}

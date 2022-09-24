//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, PipelineStage } from 'mongoose';
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import { mapUserdocToUserDTO } from '../../core-user/repositories/lib/map-userdoc-to-userdto';
import { User, UserDocument } from '../../core-user/schemas/user.schema';
import type { CoreCompanyDTO } from '../dto/core-company.dto';
import { mapCompanyToResponse } from '../lib/map-company-to-response';
import type { CompanyV1ProfileResponseBody } from '../models';
import { Company, CompanyDocument } from '../schemas/core-company.schema';
import { mapCompanyDocToCompanyDto } from './lib/map-to-company-dto';

export class CompanyV1ProfileRepository {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async getByIds(companyIds: readonly string[]): Promise<CoreCompanyDTO[]> {
    const pipeline: PipelineStage[] = [
      { $match: { _id: { $in: companyIds.map((i) => new ObjectId(i)) } } },
      {
        $lookup: {
          from: 'users',
          as: 'company_owner',
          localField: '_owner',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$company_owner',
        },
      },
      {
        $lookup: {
          from: 'auths',
          as: 'company_owner_auth',
          localField: 'company_owner._auth',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$company_owner_auth',
        },
      },
    ];
    const companyAggregate = await this.companyModel.aggregate(pipeline);

    return companyAggregate.map((car) => {
      const company = new this.companyModel(car);
      const owner = new this.userModel(car.company_owner);
      const ownerAuth = new this.authModel(car.company_owner_auth);
      return { ...mapCompanyDocToCompanyDto(company), _owner: mapUserdocToUserDTO(owner, ownerAuth, company) };
    });
  }

  async getProfile(companyId: string): Promise<CompanyV1ProfileResponseBody | null> {
    const pipeline: PipelineStage[] = [
      { $match: { _id: new ObjectId(companyId) } },
      {
        $lookup: {
          from: 'users',
          as: 'company_owner',
          localField: '_owner',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$company_owner',
        },
      },
      {
        $lookup: {
          from: 'auths',
          as: 'company_owner_auth',
          localField: 'company_owner._auth',
          foreignField: '_id',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$company_owner_auth',
        },
      },
    ];
    const companyAggregate = await this.companyModel.aggregate(pipeline);

    if (!companyAggregate?.length) {
      return null;
    }

    const car = companyAggregate[0];
    const company = new this.companyModel(car);
    const owner = new this.userModel(car.company_owner);
    const ownerAuth = new this.authModel(car.company_owner_auth);

    return mapCompanyToResponse({ company, owner, ownerAuth });
  }
}

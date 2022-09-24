//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getDiff from '../../../../lib/get-diff';
import type { RepositoryUpdateResult } from '../../../../types/UpdateResult';
import type { CoreUserEmploymentDTO } from '../dto/core-user-employment.dto';
import { UserProfileEmployeeType, UserProfileType } from '../schemas/partials';
import { User, UserDocument } from '../schemas/user.schema';
import { mapToUserEmploymentDTO } from './lib/map-userdoc-to-employmentdto';

@Injectable()
export class CoreUserEmploymentRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateUserEmployment(
    userId: string,
    employmentInput: Partial<CoreUserEmploymentDTO>,
  ): Promise<RepositoryUpdateResult<CoreUserEmploymentDTO> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    const original = user.toObject();

    if (employmentInput.classification) {
      user.profile.classification = employmentInput.classification;
    }

    if (employmentInput.contractorBusinessName) {
      user.profile.contractor_business_name = employmentInput.contractorBusinessName;
    }

    if (employmentInput.contractorType) {
      user.profile.contractor_type = employmentInput.contractorType;
    }

    if (typeof employmentInput.isContractor !== 'undefined') {
      user.profile.contractor = employmentInput.isContractor;
    }

    if (employmentInput.payType) {
      user.profile.type = dtoToProfileType(employmentInput.payType);
    }

    if (employmentInput.employeeType) {
      user.profile.employee_type = dtoToEmployeeType(employmentInput.employeeType);
    }

    if (employmentInput.title) {
      user.profile.role = employmentInput.title;
    }

    if (employmentInput.hoursPerWeek) {
      user.profile.hours_per_week = employmentInput.hoursPerWeek;
    }

    if (employmentInput.payRate) {
      user.profile.pay_rate = employmentInput.payRate;
    }

    if (employmentInput.payDay) {
      user.profile.pay_day = employmentInput.payDay;
    }

    if (employmentInput.payFrequency) {
      user.profile.pay_frequency = employmentInput.payFrequency;
    }

    if (employmentInput.startDate) {
      user.profile.start_date = employmentInput.startDate;
    }

    if (employmentInput.stateWorksIn) {
      user.profile.state_work_in = employmentInput.stateWorksIn;
    }

    const updated = await user.save();

    const updates = getDiff(original.profile, updated.profile, 'user.profile');
    return {
      diffs: updates,
      result: mapToUserEmploymentDTO(updated),
    };
  }
}

function dtoToEmployeeType(i: CoreUserEmploymentDTO['employeeType']): UserProfileEmployeeType {
  switch (i) {
    case 'fulltime':
      return UserProfileEmployeeType.FULLTIME;
    case 'parttime':
      return UserProfileEmployeeType.PARTTIME;
    case 'contractor':
      return UserProfileEmployeeType.CONTRACTOR;
    default:
      return UserProfileEmployeeType.DEFAULT;
  }
}

function dtoToProfileType(i: CoreUserEmploymentDTO['payType']): UserProfileType {
  switch (i) {
    case 'hourly':
      return UserProfileType.HOURLY;
    case 'salary':
      return UserProfileType.SALARY;
    case 'contractor':
      return UserProfileType.CONTRACTOR;
    default:
      return UserProfileType.DEFAULT;
  }
}

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
import { Auth, AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import type { CoreUserProfileDTO } from '../dto/core-user-profile.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { mapToUserProfileDTO } from './lib/map-userdoc-to-profiledto';

@Injectable()
export class CoreUserProfileRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}

  async updateUserProfile(
    userId: string,
    profileInput: Partial<Omit<CoreUserProfileDTO, 'email'>>,
  ): Promise<RepositoryUpdateResult<CoreUserProfileDTO> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    const original = user.toObject();

    if (profileInput.firstName) {
      user.profile.first_name = profileInput.firstName;
    }

    if (profileInput.lastName) {
      user.profile.last_name = profileInput.lastName;
    }

    // Q: do we need to format?
    if (profileInput.phone) {
      user.profile.phone = profileInput.phone.replace(/[\s()-]/gi, '');
    }

    // Q: do we need to format?
    if (profileInput.dob) {
      user.profile.dob = profileInput.dob;
    }

    if (profileInput.address) {
      if (profileInput.address.line1) {
        user.profile.address = profileInput.address.line1;
      }
      if (profileInput.address.line2) {
        user.profile.address2 = profileInput.address.line2;
      }
      if (profileInput.address.city) {
        user.profile.city = profileInput.address.city;
      }
      if (profileInput.address.state) {
        user.profile.state = profileInput.address.state;
      }
      if (profileInput.address.zipCode) {
        user.profile.zip = profileInput.address.zipCode;
      }
    }

    if (profileInput.emergencyContact) {
      if (profileInput.emergencyContact.name) {
        user.profile.emergency_contact.name = profileInput.emergencyContact.name;
      }
      if (profileInput.emergencyContact.phone) {
        user.profile.emergency_contact.phone = profileInput.emergencyContact.phone;
      }
      if (profileInput.emergencyContact.relationship) {
        user.profile.emergency_contact.relationship = profileInput.emergencyContact.relationship;
      }
      if (profileInput.emergencyContact.email) {
        user.profile.emergency_contact.email = profileInput.emergencyContact.email;
      }
    }

    const updated = await user.save();

    const updates = getDiff(original.profile, updated.profile, 'user.profile');
    const authDoc = await this.authModel.findById(user._auth.toString());
    return {
      diffs: updates,
      result: mapToUserProfileDTO(updated, authDoc!),
    };
  }
}

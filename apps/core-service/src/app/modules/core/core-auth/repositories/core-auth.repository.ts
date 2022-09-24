//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CoreAuthDTO } from '../dto/core-auth.dto';
import { Auth, AuthDocument } from '../schemas/core-auth.schema';
import { mapAuthDocumentToAuthDTO } from './map-authdocument-to-authdto';

@Injectable()
export class CoreAuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  public async getById(authId: string): Promise<(CoreAuthDTO & { _userId?: string }) | null> {
    const res = await this.authModel.findById(authId);
    if (!res) {
      return null;
    }
    return mapAuthDocumentToAuthDTO(res, res._user.toString());
  }

  public async getByIds(authIds: readonly string[]): Promise<CoreAuthDTO[]> {
    const res = await this.authModel.find({ _id: { $in: authIds } });

    return res.map((r) => mapAuthDocumentToAuthDTO(r));
  }

  public async getByUserId(userId: string): Promise<CoreAuthDTO | null> {
    const res = await this.authModel.findOne({ _user: userId });
    if (!res) {
      return null;
    }
    return mapAuthDocumentToAuthDTO(res);
  }

  public async getByUserIds(userIds: readonly string[]): Promise<Array<CoreAuthDTO & { _userId?: string }>> {
    const res = await this.authModel.find({ _user: { $in: userIds } });

    return res.map((r) => mapAuthDocumentToAuthDTO(r, r._user.toString()));
  }

  public async getByEmail(email: string): Promise<CoreAuthDTO | null> {
    const res = await this.authModel.findOne({ email });
    if (!res) {
      return null;
    }
    return mapAuthDocumentToAuthDTO(res);
  }

  /**
   * While unused, this implementation replaces the removed setter/getter from Auth.Schema.tosAcceptedAt
   * @param authId
   */
  public async setTosAccepted(authId: string) {
    const res = await this.authModel.findById(authId);
    if (res) {
      res.tosAcceptedAt = new Date();
      await res.save();
    }
  }
}

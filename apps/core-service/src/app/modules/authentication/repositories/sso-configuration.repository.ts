//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { SsoConfigDTO } from '../dto/SsoConfig.dto';
import { SsoClientConfiguration, SsoClientConfigurationDocument } from '../schemas/SsoClientConfiguration.schema';

@Injectable()
export class SsoConfigurationRepository {
  constructor(@InjectModel(SsoClientConfiguration.name) protected ssoConfigModel: Model<SsoClientConfiguration>) {}

  public async findWithSecret(clientId: string, clientSecret: string) {
    const doc = await this.ssoConfigModel.findOne({ clientId, clientSecret }).select('+privateKey');
    if (!doc) {
      return null;
    } else {
      return mapDocToDto(doc);
    }
  }
}

function mapDocToDto(doc: SsoClientConfigurationDocument): SsoConfigDTO {
  return {
    clientId: doc.clientId,
    clientSecret: doc.clientSecret,
    privateKey: doc.privateKey,
    publicKey: doc.publicKey,
  };
}

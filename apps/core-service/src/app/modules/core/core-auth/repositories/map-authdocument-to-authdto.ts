//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreAuthDTO } from '../dto/core-auth.dto';
import type { AuthDocument } from '../schemas/core-auth.schema';

export function mapAuthDocumentToAuthDTO(doc: AuthDocument, _userId?: string): CoreAuthDTO & { _userId?: string } {
  return {
    id: doc._id.toString(),
    username: doc.username,
    email: doc.email,
    tosAcceptedAt: doc.tosAcceptedAt,

    // private, for dataloaders only
    _userId,
  };
}

export enum AuthJWTSignatureRoles {
  ADMIN = 'admin',
}

export interface AuthJWTSignature {
  roles: string[];
}

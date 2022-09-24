//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { faker } from '@faker-js/faker';
import type { ConfigService } from '@nestjs/config';
import { createMock } from 'ts-auto-mock';
import { withLogger } from '../../../../../__tests__/test-helper';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { TokenV3Service } from './token-v3.service';

describe('TokenService V1', () => {
  it('Generates an Access Token', async () => {
    const configMock = createMock<ConfigService>({
      get: (key) =>
        ({
          'authentication.jwt.expiresIn': '10m',
          'authentication.jwt.privateKey': 'test-secret-token',
          'authentication.jwt.publicKey': 'test-secret-token',
          'authentication.internal.publicKey': 'internal-key',
          'authentication.masquerade.privateKey': 'masq-key',
        }[key]),
    });

    const service = new TokenV3Service(configMock, withLogger());

    const mockEmail = faker.internet.email();
    const mockPassword = faker.random.alphaNumeric(24);
    const mockDeviceId = faker.random.alphaNumeric(24);

    const mockDto = createMock<AuthUserDTO>({
      id: 'user-id',
      fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: mockEmail,
      passwordHash: mockPassword,
    });
    const token = await service.generateAccessToken(mockDto, mockDeviceId);
    expect(typeof token.value).toEqual('string');
    expect(token.expiration).toBeInstanceOf(Date);
  });
});

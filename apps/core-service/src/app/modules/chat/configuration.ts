//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerAs } from '@nestjs/config';

export const getConfiguration = () =>
  registerAs('chat', () => {
    const config = {
      sendbird: {
        apiKey: process.env.SENDBIRD_API_TOKEN,
        appId: process.env.SENDBIRD_APP_ID,
      },
    };

    return config;
  });

//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { request, RequestOptions } from 'http';

const options: RequestOptions = {
  host: 'localhost',
  path: '/health-check',
  port: process.env.PORT || process.env.NODE_PORT || 3000,
  timeout: 2000,
};

const healthcheckReq = request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

healthcheckReq.on('error', function (err) {
  console.log('ERROR');
  process.exit(1);
});

healthcheckReq.end();

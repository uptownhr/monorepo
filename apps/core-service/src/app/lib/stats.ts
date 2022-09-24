//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { StatsD } from 'hot-shots';
import { getLogger } from './logging';
const logger = getLogger();
const statClient = new StatsD({
  errorHandler(err) {
    logger.error(err);
  },
});
export default statClient;

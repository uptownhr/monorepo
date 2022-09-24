//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Controller, Get, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import statClient from '../../lib/stats';
import { HealthcheckService } from './healthcheck.service';

@Controller()
@ApiTags('HealthCheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get('/health-check')
  @ApiResponse({ status: 200 })
  getHealthcheck(): Promise<{ ok: string }> {
    return this.healthcheckService.getHealthcheck();
  }

  @Get('/authenticated-health-check')
  @ApiResponse({ status: 200 })
  getAuthHealthcheck(@AuthUser() currentUser: CurrentUser): { ok: string } {
    return { ok: currentUser.userId };
  }

  @Get('/info')
  @ApiResponse({ status: 200 })
  getInfo(): Promise<Record<string, string | boolean | undefined>> {
    return this.healthcheckService.getInfo();
  }

  @Put('/health-check-stat')
  async pushStat() {
    statClient.increment('com.bambee.core-service.health-check-stat');
  }

  @Get('/ready')
  getReady(): Promise<HealthCheckResult> {
    return this.healthcheckService.getReady();
  }

  @Get('/health')
  getHealthy(): Promise<HealthCheckResult> {
    return this.healthcheckService.getHealthy();
  }
}

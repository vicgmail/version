import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeploymentService } from 'src/deployment/deployment.service';

import { VersionPlanService } from 'src/version-plan/version-plan.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly versionPlanService: VersionPlanService,
    private readonly deploymentService: DeploymentService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async createVersionPlans() {
    await this.versionPlanService.autoCreate();
    await this.deploymentService.deployFront();
  }
}

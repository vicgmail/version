import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { VersionPlanService } from 'src/version-plan/version-plan.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly versionPlanService: VersionPlanService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async createVersionPlans() {
    await this.versionPlanService.autoCreate();
  }
}

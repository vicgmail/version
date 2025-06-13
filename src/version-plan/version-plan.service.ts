/* eslint-disable @typescript-eslint/no-floating-promises */

import { Injectable } from '@nestjs/common';
import { DEPLOYMENT_TIME_MS } from 'src/constants/env';
import { VersionService } from 'src/version/version.service';

@Injectable()
export class VersionPlanService {
  constructor(private readonly versionService: VersionService) {}

  public async autoCreate(): Promise<void> {
    const version = await this.versionService.deploymentVersion();
    let [major, minor, build] = version.split('.').map((v) => parseInt(v, 10));

    const nowDate = new Date();
    if (major < nowDate.getFullYear() % 2000) {
      major = nowDate.getFullYear() % 2000;
    }

    if (minor < nowDate.getMonth()) {
      minor = nowDate.getMonth();
    }

    build += 1;

    const createdVersion = await this.versionService.create({
      major,
      minor,
      build,
    });

    if (!createdVersion?.id) {
      return;
    }

    setTimeout(() => {
      this.versionService.update(createdVersion.id, {
        inProgress: false,
      });
    }, DEPLOYMENT_TIME_MS);
  }
}

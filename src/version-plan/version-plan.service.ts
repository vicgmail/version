import { Injectable } from '@nestjs/common';
import { VersionService } from 'src/version/version.service';

@Injectable()
export class VersionPlanService {
  constructor(private readonly versionService: VersionService) {}

  public async autoCreate(): Promise<void> {
    const version = await this.versionService.actual();
    let [major, minor, build] = version.split('.').map((v) => parseInt(v, 10));

    const nowDate = new Date();
    if (major < nowDate.getFullYear() % 2000) {
      major = nowDate.getFullYear() % 2000;
    }

    if (minor < nowDate.getMonth()) {
      minor = nowDate.getMonth();
    }

    build += 1;

    await this.versionService.create({
      major,
      minor,
      build,
    });
  }
}

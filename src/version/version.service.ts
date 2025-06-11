import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Version } from './version.model';
import { NODE_ENV } from 'src/constants/env';
import { CreateVersionDto } from './version.dto';

@Injectable()
export class VersionService {
  constructor(
    @InjectModel(Version)
    private versionModel: typeof Version,
  ) {}

  public async actual(): Promise<string> {
    const version = await this.versionModel.findOne({
      where: { isActive: true, env: NODE_ENV },
      order: [
        ['major', 'DESC'],
        ['minor', 'DESC'],
        ['build', 'DESC'],
      ],
    });

    if (!version) {
      return '1.0.0';
    }

    return `${version.major}.${version.minor}.${version.build}`;
  }

  async create(data: CreateVersionDto): Promise<Version | void> {
    const newVersion = { ...data, env: NODE_ENV };

    console.log('Add new version:', newVersion);

    return await this.versionModel
      .create(newVersion)
      .catch((e) => console.error(e));
  }
}

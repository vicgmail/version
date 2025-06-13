import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Version } from './version.model';
import { NODE_ENV } from 'src/constants/env';
import { CreateVersionDto, UpdateVersionDto } from './version.dto';

@Injectable()
export class VersionService {
  constructor(
    @InjectModel(Version)
    private versionModel: typeof Version,
  ) {}

  public actualVersion(): Promise<string> {
    return this.get({ isActive: true, inProgress: false, env: NODE_ENV });
  }

  public deploymentVersion(): Promise<string> {
    return this.get({ isActive: true, env: NODE_ENV });
  }

  private async get(where: Partial<Version>): Promise<string> {
    const version = await this.versionModel.findOne({
      where,
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
    const newVersion = { ...data, env: NODE_ENV, inProgress: true };

    console.log('Add new version:', newVersion);

    return await this.versionModel
      .create(newVersion)
      .catch((e) => console.error(e));
  }

  async update(id: string, data: UpdateVersionDto): Promise<any> {
    return await this.versionModel
      .update(data, {
        where: {
          id,
        },
      })
      .catch((e) => console.error(e));
  }
}

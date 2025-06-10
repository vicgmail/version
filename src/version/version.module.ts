import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Version } from './version.model';

@Module({
  imports: [SequelizeModule.forFeature([Version])],
  providers: [VersionService],
  controllers: [VersionController],
})
export class VersionModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

import { VersionModule } from './version/version.module';
import { ScheduleService } from './schedule/schedule.service';
import { VersionPlanService } from './version-plan/version-plan.service';
import { DeploymentService } from './deployment/deployment.service';
import { VercelService } from './deployment/vercel.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +!process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      sync: {
        force: false,
      },
      logging: process.env.DB_SQL_LOG == '1',
      dialectOptions: {
        ssl:
          process.env.DB_SSL === '1'
            ? {
                require: true,
                rejectUnauthorized: false,
              }
            : false,
      },
    }),
    ScheduleModule.forRoot(),
    VersionModule,
  ],
  providers: [
    ScheduleService,
    VersionPlanService,
    DeploymentService,
    VercelService,
  ],
})
export class AppModule {}

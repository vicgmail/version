import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { VersionModule } from './version/version.module';

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
    VersionModule,
  ],
})
export class AppModule {}

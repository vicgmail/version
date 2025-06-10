import { Column, Model, Table } from 'sequelize-typescript';

import { ENV } from 'src/constants/env';

@Table({
  timestamps: true,
  tableName: 'Version',
})
export class Version extends Model<Version> {
  @Column
  env: ENV;

  @Column
  major: number;

  @Column
  minor: number;

  @Column
  build: number;

  @Column({ defaultValue: true })
  isActive: boolean;
}

import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { ENV } from 'src/constants/env';

@Table({
  timestamps: true,
  tableName: 'Version',
})
export class Version extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

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

  @Column({ defaultValue: false })
  inProgress: boolean;
}

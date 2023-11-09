import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: "roles",
  timestamps: false,
})
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  role_name!: string;

  @Column(DataType.STRING)
  created_by!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;

  @Column(DataType.STRING)
  updated_by!: string;

  @Column(DataType.DATE)
  updated_at!: Date;
}

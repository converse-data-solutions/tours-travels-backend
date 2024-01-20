import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./role.model";

@Table({
  timestamps: false,
  tableName: "users",
})
export class Userinfo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  mobile_number!: string;

  @ForeignKey(() => Role)
  @Default(2)
  @Column(DataType.INTEGER)
  role_id!: number;

  
  @BelongsTo(() => Role)
  role_name!: Role;

  @Column(DataType.STRING)
  first_name!: string;

  @Column(DataType.STRING)
  last_name!: string;

  @Column(DataType.STRING)
  country!: string;

  @Column(DataType.ENUM("Male", "Female", "Transgender"))
  gender!: "Male" | "Female" | "Transgender";

  @Column(DataType.TEXT)
  address!: string;

  @Column(DataType.STRING)
  social_media_link!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  user_status!: boolean;

  @Column(DataType.STRING)
  file_name!: string;

  @Column(DataType.STRING)
  default_currency!: string;

  @Column(DataType.STRING)
  default_language!: string;

  @Column(DataType.STRING)
  agent_position!: string;

  @Column(DataType.STRING)
  created_by!: string;

  @Default(DataType.NOW)
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at!: Date;

  @Column(DataType.STRING)
  updated_by!: string;


  @Default(DataType.NOW)
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updated_at!: Date;
}

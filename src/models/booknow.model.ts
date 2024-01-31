import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import { Package } from "./package.model";
import { Userinfo } from "./userinfo.model";

@Table({
  tableName: "bookings",
  timestamps: false,
})
export class Booking extends Model<Booking> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  first_name!: string;

  @Column(DataType.STRING)
  last_name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  mobile_number!: string;

  @Column(DataType.STRING)
  gender!: string;

  @Column(DataType.DATE)
  date_of_birth!: Date;

  @Column(DataType.STRING)
  country!: string;

  @Column(DataType.STRING)
  state!: string;

  @Column(DataType.STRING)
  address_1!: string;

  @Column(DataType.STRING)
  address_2!: string;

  @ForeignKey(() => Package)
  @Column(DataType.INTEGER)
  package_id!: number;

  @ForeignKey(() => Userinfo)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.TINYINT)
  terms_and_conditions!: number;

  @Column(DataType.INTEGER)
  total_persons!: number;

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

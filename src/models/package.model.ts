import { TinyIntegerDataType } from "sequelize";
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
  tableName: "packages",
  timestamps: false,
})

export class Package  extends Model<Package>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;
  
  @Column(DataType.DATE)
  start_date!:Date;

  @Column(DataType.STRING)
  file_name!: string;

  @Column(DataType.STRING)
  destination!:string;

  @Column(DataType.STRING)
  price!:string;

  @Column(DataType.NUMBER)
  no_of_person!:number;

  @Column(DataType.STRING)
  days_and_night!:string;

  @Column(DataType.STRING)
  description!:string;

  @Column(DataType.TINYINT)
  published!:number;

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
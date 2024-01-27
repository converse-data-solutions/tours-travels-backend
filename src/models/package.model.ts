import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
@Table({
  tableName: "packages",
  timestamps: false,
})
export class Package extends Model<Package> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.DATE)
  start_date!: Date;

  @Column(DataType.STRING)
  file_name!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  price!: string;

  @Column(DataType.INTEGER)
  no_of_person!: number;

  @Column(DataType.STRING)
  days_and_night!: string;

  @Column(DataType.STRING)
  country!: string;

  @Column(DataType.STRING)
  state!: string;

  @Column(DataType.STRING)
  superior_twin_price!: string;

  @Column(DataType.STRING)
  category!:string;

  @Column(DataType.STRING)
  offer!: string;

  @Column(DataType.STRING)
  booking_fees!: string;

  @Column(DataType.TINYINT)
  published!: number;

  @Column(DataType.STRING)
  created_by!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;

  @Column(DataType.STRING)
  updated_by!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  updated_at!: Date;
}

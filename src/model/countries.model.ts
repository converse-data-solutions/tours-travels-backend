import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    HasMany

  } from "sequelize-typescript";

  import {State} from "../model/states.model";
  import { User } from "./users.model";
  import { History } from "./usersHistory.model";
  
  @Table({
    tableName: "countries",
    timestamps: false,
  })
  export class Country extends Model<Country> {
    @PrimaryKey
    @Column(DataType.STRING)
    country_id!: string;
  
    @Column(DataType.STRING)
    country_name!: string;

    @Column(DataType.STRING)
    iso_code!: string;

    @Column(DataType.STRING)
    phone_code!: string;


    @Default(1)
    @Column(DataType.NUMBER)
    status!:number;
  
    @Default('Admin')
    @Column(DataType.STRING)
    created_by!: string;
  
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_on!: Date;
  
    @Column(DataType.STRING)
    updated_by!: string;
  
    @Column(DataType.DATE)
    updated_on!: Date;

    @HasMany(() => State,'state_id')
  states!: State[];

  @HasMany(()=>User,'country_id')
  users!:User[];
  

   @HasMany(()=>History,'country_id')
  history!:History[];
  
  }
  
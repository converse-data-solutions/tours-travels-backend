import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    HasMany,
    BelongsTo

  } from "sequelize-typescript";
  import {Country} from "../model/countries.model";
  import { User } from "./users.model";
  import { History } from "./usersHistory.model";
  
  @Table({
    tableName: "states",
    timestamps: false,
  })
  export class State extends Model<State> {
    @PrimaryKey
    @Column(DataType.STRING)
    state_id!: string;

    @Column(DataType.STRING)
    country_id!: string;
  
    @Column(DataType.STRING)
    state_name!: string;

   
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
  
    @BelongsTo(() => Country, 'country_id')
    country!: Country;

    @HasMany(()=>User,'state_id')
  users!:User[];

  @HasMany(()=>History,'state_id')
  history!:History[]
  }
  
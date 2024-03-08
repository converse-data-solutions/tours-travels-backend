import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
Unique,
HasMany
  } from "sequelize-typescript";
  import { User } from "./users.model";
import { Country } from "./countries.model";
import { History } from "./usersHistory.model";
  
  @Table({
    tableName: "currencies",
    timestamps: false,
  })
  export class Currency extends Model<Currency> {
    @PrimaryKey
    @Unique
    @Column(DataType.STRING)
    currency_id!: string;
  
    @Column(DataType.STRING)
    currency_name!: string;

    @Column(DataType.STRING)
    country_code!: string;
    
    @Unique
    @Column(DataType.STRING)
    iso_code!: string;

    @Column(DataType.STRING)
    currency_symbol!: string;



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
  
    @HasMany(() => User, 'currency_id')
    users!: User[];

    // @HasMany(() => Country, 'currency_id')
    // countries!: Country[];

    @HasMany(() => History, 'currency_id')
    history!: History[];


  }
  
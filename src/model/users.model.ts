import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    BelongsTo,
    Unique,
    ForeignKey

  } from "sequelize-typescript";
  import {Country} from "../model/countries.model"
import { State } from "./states.model";
import { Language } from "./language.model";
import { Role } from "./role.model";
import { Currency } from "./currencies.model";


  
  @Table({
    tableName: "users",
    timestamps: false,
  })
  export class User extends Model<User> {
    @PrimaryKey
    @Column(DataType.STRING)
    user_id!: string;

    @Column(DataType.STRING)
    role_id!: string;


    @Column(DataType.STRING)
    country_id!: string;

    @Column(DataType.STRING)
    state_id!: string;


    @Column(DataType.STRING)
    user_name!: string;

    @Unique
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    phone_code!: string;

    @Unique
    @Column(DataType.STRING)
    phone!: string;
   
    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.STRING)
    image!: string;
    
   

    @Column(DataType.STRING)
    language_id!: string;

    @Column(DataType.STRING)
    currency_id!: string;

    @Column(DataType.STRING)
    add1!: string;

    @Column(DataType.STRING)
    add2!: string;

    @Column(DataType.STRING)
    add3!: string;

    @Column(DataType.STRING)
    city!: string;


    @Column(DataType.STRING)
    zip_code!: string;

    @Column(DataType.DATE)
    effective_from!: Date;


    @Column(DataType.DATE)
    effective_to!: Date;

   
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

    @BelongsTo(()=>Role,'role_id')
    role!:Role;
  
    @BelongsTo(() => Country, 'country_id')
    country!: Country;

    @BelongsTo(()=>State,'state_id')
    state!:State;

    @BelongsTo(()=>Language,'language_id')
    languages!:Language;

    @BelongsTo(()=>Currency,'currency_id')
    currencies!:Currency;


  }
  
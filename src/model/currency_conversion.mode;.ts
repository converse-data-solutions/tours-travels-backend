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
import { DecimalDataType } from "sequelize";
import { Currency } from "./currencies.model";
  
  @Table({
    tableName: "states",
    timestamps: false,
  })
  export class CurrencyConversion extends Model<CurrencyConversion> {
    @PrimaryKey
    @Column(DataType.STRING)
    conversion_id!: string;

    @Column(DataType.DATE)
    from_currency_id!: Date;

    @Column(DataType.DATE)
    to_currency_id!: Date;
  

    @Column(DataType.DECIMAL)
    conversion_factor!: DecimalDataType;
  
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
  
    @BelongsTo(() => Currency, 'currency_id')
    currency!: Currency;

    

  }
  
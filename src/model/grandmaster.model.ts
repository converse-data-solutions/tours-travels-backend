import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    HasMany

  } from "sequelize-typescript";
  import {Master} from "../model/master.model"

  @Table({
    tableName: "grandmasters",
    timestamps: false,
  })
  export class Grandmaster extends Model<Grandmaster> {
    @PrimaryKey
    @Column(DataType.STRING)
    grandmaster_id!: string;
  
    @Column(DataType.STRING)
    grandmaster_name!: string;


    @Column(DataType.STRING)
    grandmaster_type!: string;


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
  
    @HasMany(() => Master,'grandmaster_id')
  masters!: Master[];
   
  }
  

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
  import { Operation } from "./operation.model";
import { Grandmaster } from "./grandmaster.model";
  
  @Table({
    tableName: "masters",
    timestamps: false,
  })
  export class Master extends Model<Master> {
    @PrimaryKey
    @Column(DataType.STRING)
    master_id!: string;

    @Column(DataType.STRING)
    grandmaster_id!: string;

    @Column(DataType.STRING)
    master_name!: string;
  
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
  
    @BelongsTo(() => Operation, 'operation_id')
    operation!: Operation;

    @BelongsTo(() => Grandmaster, 'role_id')
    role!: Operation;


  }
  
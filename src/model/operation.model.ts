import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    HasMany,

  } from "sequelize-typescript";
import { Permission } from "./permission.model";
  
  @Table({
    tableName: "operations",
    timestamps: false,
  })
  export class Operation extends Model<Operation> {
    @PrimaryKey
    @Column({ type: DataType.STRING(100) })
    operation_id!: string;
  
    @Column({ type: DataType.STRING(100) })
    operation!: string;
  
    @Column({ type: DataType.STRING(300) })
    name!: string;
  
    @Default(1)
    @Column({ type: DataType.TINYINT })
    status!: number;
  
    @Default(DataType.NOW)
    @Column({ type: DataType.DATE })
    created_on!: Date;
  
    @Default("Admin")
    @Column({ type: DataType.STRING(100) })
    created_by!: string;
  
    @Column({ type: DataType.DATE })
    updated_on!: Date;
  
    @Column({ type: DataType.STRING(100) })
    updated_by!: string;
  
    @HasMany(() => Permission, 'operation_id')
    permissions!: Permission[];
  }
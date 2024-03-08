import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    BelongsTo

  } from "sequelize-typescript";
  import { Operation } from "./operation.model";
import { Role } from "./role.model";
  
  @Table({
    tableName: "permissions",
    timestamps: false,
  })
  export class Permission extends Model<Permission> {
    @PrimaryKey
    @Column({ type: DataType.STRING(50) })
    permission_id!: string;
  
    @Column({ type: DataType.STRING(45) })
    role_id!: string;
  
    @Column({ type: DataType.STRING(45) })
    operation_id!: string;
  
    @Column({ type: DataType.DATE })
    effective_from!: Date;
  
    @Column({ type: DataType.DATE })
    effective_to!: Date;
  
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
  
    @BelongsTo(() => Operation, 'operation_id')
    operation!: Operation;
  
    @BelongsTo(() => Role, 'role_id')
    role!: Role;
  }
  
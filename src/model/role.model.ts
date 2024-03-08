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
import { User } from "./users.model";
import { History } from "./usersHistory.model";
  
  @Table({
    tableName: "roles",
    timestamps: false,
  })
  export class Role extends Model<Role> {
    @PrimaryKey
    @Column(DataType.STRING)
    role_id!: string;
  
    @Column(DataType.STRING)
    name!: string;

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

    @HasMany(()=>Permission,'role_id')
    roles!:Role[];

    @HasMany(()=>User,'role_id')
    users!:User[];

    @HasMany(()=>History,'role_id')
    history!:History[];

  
   
  }
  
import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    PrimaryKey,
    HasMany

  } from "sequelize-typescript";
  import { User } from "./users.model";
  import { History } from "./usersHistory.model";
  
  @Table({
    tableName: "languages",
    timestamps: false,
  })
  export class Language extends Model<Language> {
    @PrimaryKey
    @Column(DataType.STRING)
    language_id!: string;
  
    @Column(DataType.STRING)
    language_name!: string;

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

    @HasMany(() => User,'language_id')
  users!: User[];

  // @HasMany(() => History,'language_id')
  // history!: History[];
  
   
  }
  
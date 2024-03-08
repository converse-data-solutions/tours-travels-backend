import { PrimaryKey,Default,Column,DataType, Model,Table, AutoIncrement} from "sequelize-typescript";

@Table({
    tableName:"idgens",
    timestamps:false
})

export class Idgen extends Model<Idgen>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.NUMBER)
    id!:number;

    @Column(DataType.STRING)
    idname!:string;

    @Column(DataType.STRING)
    idtype!:string;

    @Column(DataType.NUMBER)
    numchar!:number;

    @Column(DataType.STRING)
    prefix!:string;

    @Column(DataType.NUMBER)
    maxval!:number;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    createddate!:Date;

    @Column(DataType.STRING)
    createdby!:string;

    @Column(DataType.DATE)
    updateddate!:Date;

    @Column(DataType.STRING)
    updatedby!:string;


}
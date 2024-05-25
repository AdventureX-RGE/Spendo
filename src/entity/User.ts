import {Column, Entity, Generated, OneToMany, PrimaryColumn} from "typeorm";
import {Record, RecordType} from "./Record";

export enum Role {
    ADMIN = "admin",
    USER = "user",
    COORDINATOR = "coordinator",
}

@Entity()
export class User {
    @PrimaryColumn({type: "uuid"})
    @Generated("uuid")
    id: string

    @Column('text')
    name: string
    
    @Column('text')
    password: string

    @Column({type: 'enum', enum: Role})
    role: Role
    
    @OneToMany(type => Record, record => record.user)
    records: Record[]
}
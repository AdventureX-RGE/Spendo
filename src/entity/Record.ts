import {Column, Entity, Generated, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";

type Relation<T> = T

export enum RecordType {
    spending = 'spending',
    reimburse = 'reimburse'
}

export enum Status {
    approve = 'approve',
    reject = 'reject',
    pending = 'pending'
}

@Entity()
export class Record {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string

    @Column()
    amount: number

    @Column({type: 'enum', enum: RecordType})
    type: RecordType

    @Column('text')
    note: string

    @Column({type: 'enum', enum: Status})
    status: Status

    @Column({ type: "bytea", nullable: false })
    public file: Buffer

    @ManyToOne(type => User, user => user.records)
    user: Relation<User>
}
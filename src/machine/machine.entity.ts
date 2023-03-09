import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum MachineType {
    Press = 'press',
    Grinding = 'grinding',
    Drilling = 'drilling',
}

export enum MachineStatus {
    Active = 'active',
    Inactive = 'inactive',
    Broken = 'broken',
}


@Entity()
export class Machine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
    type: 'enum',
    enum: MachineType,
    })
    type: MachineType;

    @Column({
    type: 'enum',
    enum: MachineStatus,
    })
    status: MachineStatus;

    @Column()
    location: string;

    @Column()
    isInternal: boolean;
}


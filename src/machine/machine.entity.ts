import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
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

registerEnumType(MachineType, {
    name: 'MachineType',
});


registerEnumType(MachineStatus, {
    name: 'MachineStatus',
});

@Entity()
@ObjectType()
export class Machine {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    name: string;
    
    @Column({
        type: 'enum',
        enum: MachineType,
    })
    @Field(type => MachineType)
    type: MachineType;

    @Column({   
        type: 'enum',
        enum: MachineStatus,
    })
    @Field(type => MachineStatus)
    status: MachineStatus;
    

    @Column()
    @Field()
    location: string;
    

    @Column()
    @Field(type => Boolean)
    isInternal: boolean;
    
}


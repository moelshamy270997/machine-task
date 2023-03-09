import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsBoolean, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { MachineType, MachineStatus } from '../machine/machine.entity';

@InputType()
export class CreateMachineDto {

    @IsNotEmpty({message: 'The machine shoud have a name'})
    @Field()
    name: string;
    
    @IsEnum(MachineType)
    @Field(type => MachineType)
    type: MachineType;

    @IsEnum(MachineStatus)
    @Field(type => MachineStatus)
    status: MachineStatus;
    
    @IsNotEmpty({message: 'The machine shoud have a location'})
    @IsAlpha()
    @Field()
    location: string;

    @IsNotEmpty({message: 'The machine shoud have an internal value (true or false)'})
    @IsBoolean()
    @Field(type => Boolean)
    isInternal: boolean;
}

@InputType()
export class UpdateMachineDto {

    @Field({nullable: true})
    @IsOptional()
    name?: string;
    
    @IsEnum(MachineType)
    @Field(type => MachineType, {nullable: true})
    @IsOptional()
    type?: MachineType;

    @IsEnum(MachineStatus)
    @Field(type => MachineStatus, {nullable: true})
    @IsOptional()
    status?: MachineStatus;
    
    @IsAlpha()
    @Field({nullable: true})
    @IsOptional()
    location?: string;

    @IsBoolean()
    @IsOptional()
    @Field(type => Boolean, {nullable: true})
    isInternal?: boolean;
}
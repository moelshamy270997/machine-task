import { IsAlpha, IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { MachineType, MachineStatus } from '../machine/machine.entity';

export class CreateMachineDto {

    @IsNotEmpty({message: 'The machine shoud have a name'})
    name: string;

    @IsEnum(MachineType)
    type: MachineType;

    @IsEnum(MachineStatus)
    status: MachineStatus;

    @IsNotEmpty({message: 'The machine shoud have a location'})
    @IsAlpha()
    location: string;

    @IsNotEmpty({message: 'The machine shoud have an internal value (true or false)'})
    @IsBoolean()
    isInternal: boolean;
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Machine } from './machine.entity';
import { MachineService } from './machine.service';
import { MachineType, MachineStatus} from './machine.entity';
import { CreateMachineDto, UpdateMachineDto } from 'src/dto/Machine.dto';

@Resolver()
export class MachineResolver {
    constructor(private readonly machineService: MachineService) {}

    @Query(returns => [Machine])
    machines(
        @Args('id', {type: () => String, nullable: true}) id: string,
        @Args('type', {type: () => MachineType, nullable: true}) type: MachineType,
        @Args('status', {type: () => MachineStatus, nullable: true})status: MachineStatus,
        @Args('isInternal', {type: () => Boolean, nullable: true})isInternal: boolean): Promise<Machine[]> {

        return this.machineService.findAll_(id, type, status, isInternal);
    }
    
    @Mutation(returns => Machine)
    createMachine(@Args('machine') machine: CreateMachineDto): Promise<Machine>  {
        return this.machineService.create(machine);
    }

    @Mutation(returns => Machine)
    updateMachine(
        @Args('id') id: string,
        @Args('machine') machine: UpdateMachineDto): Promise<Machine>  {
        return this.machineService.update(id, machine);
    }


    @Mutation(returns => Machine)
    deleteMachine(@Args('id') id: string): Promise<Machine>  {
        return this.machineService.delete(id);
    }

}

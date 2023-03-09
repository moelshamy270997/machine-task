import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMachineDto, UpdateMachineDto } from 'src/dto/Machine.dto';
import { Repository } from 'typeorm';
import { Machine } from './machine.entity';
import { MachineType, MachineStatus} from './machine.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}
  
  // GraphQL funtion to get machines, using optional parameters
  async findAll_(id: string, type: MachineType, status: MachineStatus, isInternal: boolean): Promise<Machine[]> {
    return this.machinesRepository.find({ where: { id, type, status, isInternal} });
  }

  async create(machine: CreateMachineDto): Promise<Machine> {
    return this.machinesRepository.save(machine);
  }

  async findAll(type: MachineType, status: MachineStatus, isInternal: boolean): Promise<Machine[]> {
    return this.machinesRepository.find({ where: { type, status, isInternal} });
  }

  async findById(id: string): Promise<Machine> {
    const machine = this.machinesRepository.findOneBy({ id: id });

    if ((await machine) == null) {
      throw new HttpException('Machine not found', HttpStatus.NOT_FOUND);
    }

    return machine;
  }

  async update(id: string, machine: UpdateMachineDto): Promise<Machine> {
    await this.machinesRepository.update(id, machine);
    return this.machinesRepository.findOneBy({ id: id });
  }

  async delete(id: string): Promise<Machine> {

    const machine = await this.machinesRepository.findOneBy({ id: id });

    if (machine == null) {
      throw new HttpException('Machine not found', HttpStatus.NOT_FOUND);
    }

    await this.machinesRepository.delete(id);
    return machine;
  }
  
}
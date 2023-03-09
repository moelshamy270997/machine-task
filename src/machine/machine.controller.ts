import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Machine, MachineType, MachineStatus } from './machine.entity';
import { CreateMachineDto } from '../dto/Machine.dto';

@Controller('machine')
export class MachineController {
    constructor(private readonly machinesService: MachineService) {}

    @Post()
    @HttpCode(200) // instead of 201
    @UsePipes(ValidationPipe)
    async create(@Body() createMachineDto: CreateMachineDto): Promise<CreateMachineDto> {
        return this.machinesService.create(createMachineDto);
    }
    
    @Get()
    async findAll(
        @Query('type') type: MachineType,
        @Query('status') status: MachineStatus,
        @Query('internal') internal: boolean
        ): Promise<Machine[]> {
        return this.machinesService.findAll(type, status, internal);
    }

    @Get('/:id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Machine> {
        return this.machinesService.findById(id);
    }
    
    @Put('/:id')
    @UsePipes(ValidationPipe)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() machine: CreateMachineDto): Promise<Machine> {
        return this.machinesService.update(id, machine);
    }

    @Delete('/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Machine> {
        return this.machinesService.delete(id);
    }
}


import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Machine, MachineType, MachineStatus } from './machine.entity';
import { CreateMachineDto, UpdateMachineDto } from '../dto/Machine.dto';

@Controller('machine')
export class MachineController {
    constructor(private readonly machinesService: MachineService) {}
    
    @Post()
    @HttpCode(200) // instead of 201
    @UsePipes(ValidationPipe)
    async create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
        return await this.machinesService.create(createMachineDto);
    }
    
    @Get()
    async findAll(
        @Query('type') type: MachineType,
        @Query('status') status: MachineStatus,
        @Query('internal') internal: boolean
        ): Promise<Machine[]> {
        return await this.machinesService.findAll(type, status, internal).then((res) =>  {
            return res;
        }).catch((error) => {
            return error;
        });;
    }

    @Get('/:id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Machine> {
        return await this.machinesService.findById(id).then((res) =>  {
            return res;
        }).catch((error) => {
            return error;
        });
    }
    
    @Put('/:id')
    @UsePipes(ValidationPipe)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() machine: UpdateMachineDto): Promise<Machine> {
        return await this.machinesService.update(id, machine).then((res) =>  {
            return res;
        }).catch((error) => {
            return error;
        });;
    }

    @Delete('/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Machine> {
        return await this.machinesService.delete(id).then((res) =>  {
            return res;
        }).catch((error) => {
            return error;
        });;
    }
    
}


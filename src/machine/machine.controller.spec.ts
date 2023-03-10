import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { Machine, MachineType, MachineStatus } from './machine.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MachineController', () => {
  
  let controller: MachineController;
  let service: MachineService;

  const machine1 = new Machine();
  machine1.id = '1';
  machine1.name = 'Machine 1';
  machine1.type = MachineType.Press;
  machine1.status = MachineStatus.Active;
  machine1.location = 'Dortmund';
  machine1.isInternal = true;

  const machine2 = new Machine();
  machine2.id = '2';
  machine2.name = 'Machine 2';
  machine2.type = MachineType.Press;
  machine2.status = MachineStatus.Active;
  machine2.location = 'Paderborn';
  machine2.isInternal = false;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineController],
      providers: [
        MachineService,
        {
          provide: getRepositoryToken(Machine),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MachineController>(MachineController);
    service = module.get<MachineService>(MachineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('create', () => {
    it('should create a new machine', async () => {
        const machineData = {
        name: 'Machine 1',
        type: MachineType.Press,
        status: MachineStatus.Active,
        location: 'Dortmund',
        isInternal: false,
        };

        const machine = new Machine();
        machine.name = machineData.name;
        machine.type = machineData.type;
        machine.status = machineData.status;
        machine.location = machineData.location;
        machine.isInternal = machineData.isInternal;

        jest.spyOn(service, 'create').mockResolvedValue(machine);
        const result = await controller.create(machineData);
        expect(result).toEqual(machineData);
    });
  });
  
  describe('findAll', () => {
    it('should return an array of machines', async () => {
        jest.spyOn(service, 'findAll').mockResolvedValue([machine1]);
        const result = await controller.findAll(MachineType.Press, MachineStatus.Active, true);
        expect(result).toEqual([machine1]);
    });
  });
  
  describe('findById', () => {
    it('should return a machine by id', async () => {
        jest.spyOn(service, 'findById').mockResolvedValue(machine1);
        const result = await controller.findById('1');
        expect(result).toEqual(machine1);
    });
  });
  
  describe('update', () => {
    it('should return updated machine', async () => {
        jest.spyOn(service, 'update').mockResolvedValue(machine2);
        const result = await controller.update('1', machine2);
        expect(result).toEqual(machine2);
    });
  });

  describe('delete', () => {
    it('should return true by deleting machine', async () => {
        jest.spyOn(service, 'delete').mockResolvedValue(machine1);
        const result = await controller.delete('1');
        expect(result).toEqual(machine1);
    });
  });
  
});
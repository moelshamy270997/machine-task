import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MachineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormconfig';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: ('./src/schema.gql'),
    }),
    TypeOrmModule.forRoot(config),
    MachineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



import { Module } from '@nestjs/common';
import { PizzaController } from './controllers/pizza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from '../entities/pizza.entity';
import { PizzaService } from './services/pizza.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}

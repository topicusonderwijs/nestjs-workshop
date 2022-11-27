import { Module } from '@nestjs/common';
import { PizzaController } from './controllers/pizza.controller';
import { ReviewController } from './controllers/review.controller';
import { PizzaService } from './services/pizza.service';
import { ReviewService } from './services/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from '../entities/pizza.entity';
import { Review } from '../entities/review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pizza, Review])],
    controllers: [PizzaController, ReviewController],
    providers: [PizzaService, ReviewService],
})
export class PizzaModule {}

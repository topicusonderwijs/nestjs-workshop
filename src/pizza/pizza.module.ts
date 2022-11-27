import { Module } from '@nestjs/common';
import { PizzaController } from './controllers/pizza.controller';
import { ReviewController } from './controllers/review.controller';
import { PizzaService } from './services/pizza.service';
import { ReviewService } from './services/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([])], //[HINT] we will need to tell typeorm which entities are used in this module
    controllers: [PizzaController, ReviewController],
    providers: [PizzaService, ReviewService],
})
export class PizzaModule {}

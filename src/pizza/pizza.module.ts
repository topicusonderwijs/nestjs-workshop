import { Module } from '@nestjs/common';
import { PizzaController } from './controllers/pizza.controller';
import { ReviewController } from './controllers/review.controller';
import { PizzaService } from './services/pizza.service';
import { ReviewService } from './services/review.service';

@Module({
    imports: [],
    controllers: [PizzaController, ReviewController],
    providers: [PizzaService, ReviewService],
})
export class PizzaModule {}

import { Module } from '@nestjs/common';
import { PizzaController } from './controllers/pizza.controller';
import { ReviewController } from './controllers/review.controller';

@Module({
    imports: [],
    controllers: [PizzaController, ReviewController],
    providers: [], //[HINT] You need to inform NestJS of all injectables, if it is not a controller it is a provider (https://docs.nestjs.com/providers),
})
export class PizzaModule {}

import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizza.module';

@Module({
    imports: [PizzaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

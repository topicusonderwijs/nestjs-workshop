import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';

@Controller('/pizza')
export class PizzaController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will look up all constructor parameters
     * as dependencies. It knows about dependencies through its module definition (pizza.module.ts)
     */
    constructor(private readonly pizzaService: PizzaService) {}

    @Get()
    public async getAllPizzas(): Promise<Pizza[]> {
        return this.pizzaService.getALlPizzas();
    }

    // By default, query parameters are injected as strings, but we have to safely parse it to a number.
    @Get(':id')
    public async getPizzaById(@Param('id') id: string): Promise<Pizza> {
        const pizza = await this.pizzaService.getPizzaById(+id);
        if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);
        return pizza;
    }

    @Post()
    //[HINT] we will be needing some pipes here
    public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
        return this.pizzaService.addPizza(pizza);
    }
}

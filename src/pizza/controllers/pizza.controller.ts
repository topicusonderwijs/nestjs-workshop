import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';

@Controller('/pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    @Get()
    public async getAllPizzas(): Promise<Pizza[]> {
        return this.pizzaService.getALlPizzas();
    }

    @Get(':id')
    public async getPizzaById(@Param('id') id: string): Promise<Pizza> {
        const pizza = await this.pizzaService.getPizzaById(parseInt(id));
        if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);
        return pizza;
    }

    @Post()
    public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
        return this.pizzaService.addPizza(pizza);
    }
}

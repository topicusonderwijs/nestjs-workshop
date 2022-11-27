import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';

@Controller('/pizza')
export class PizzaController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will lookup all constructor parameters
     * as dependencies. It knows about dependencies trough its module definition (pizza.module.ts)
     */
    constructor(private readonly pizzaService: PizzaService) {}

    @Get()
    public async getAllPizzas(): Promise<Pizza[]> {
        return this.pizzaService.getALlPizzas();
    }

    @Get(':id')
    public async getPizzaById(@Param('id') id: number): Promise<Pizza> {
        const pizza = await this.pizzaService.getPizzaById(id);
        if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);
        return pizza;
    }

    @Post()
    @UsePipes(PizzaNameValidationPipe, PizzaDuplicateNameValidationPipe)
    public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
        return this.pizzaService.addPizza(pizza);
    }
}

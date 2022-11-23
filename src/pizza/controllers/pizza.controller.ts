import { Body, Get, NotFoundException, Param } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';

/**
 * [HINT]
 * The PizzaModule (pizza.module.ts) defines all dependencies (controllers and providers).
 * But we also need to let NestJS know that this class is an actual controller.
 * NestJS does this by looking for annotation on classes
 *
 * Also make sure, the pizza controller uses the /pizza endpoint
 * https://docs.nestjs.com/controllers
 */
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

    @Get(':id')
    public async getPizzaById(@Param('id') id: string): Promise<Pizza> {
        const pizza = await this.pizzaService.getPizzaById(parseInt(id));
        if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);
        return pizza;
    }

    //[HINT] Creating a pizza is not a @Get
    public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
        return this.pizzaService.addPizza(pizza);
    }
}

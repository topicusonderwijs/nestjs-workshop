import { Body, Controller, Get, Post } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';

@Controller('/pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  public async getAllPizzas(): Promise<Pizza[]> {
    return this.pizzaService.getALlPizzas();
  }

  @Post()
  public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
    return this.pizzaService.addPizza(pizza);
  }
}

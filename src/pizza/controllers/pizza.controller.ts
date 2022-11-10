import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';

@Controller('/pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  public async getAllPizzas(): Promise<Pizza[]> {
    return this.pizzaService.getALlPizzas();
  }

  @Post()
  @UsePipes(PizzaNameValidationPipe, PizzaDuplicateNameValidationPipe)
  public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
    return this.pizzaService.addPizza(pizza);
  }
}

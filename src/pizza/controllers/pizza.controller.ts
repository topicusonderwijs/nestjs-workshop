import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/pizza')
@ApiTags('Pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  @ApiOperation({ description: `Get all pizza's` })
  @ApiOkResponse({
    status: 200,
    description: `List of all pizza's`,
    type: Pizza,
    isArray: true,
  })
  public async getAllPizzas(): Promise<Pizza[]> {
    return this.pizzaService.getALlPizzas();
  }

  @Post()
  @HttpCode(201)
  @UsePipes(PizzaNameValidationPipe, PizzaDuplicateNameValidationPipe)
  @ApiOperation({ description: `Create a new pizza` })
  @ApiCreatedResponse({ description: `The created pizza`, type: Pizza })
  @ApiBadRequestResponse({ status: 400, description: 'When validation fails.' })
  public async addPizza(@Body() pizza: Pizza): Promise<Pizza> {
    return this.pizzaService.addPizza(pizza);
  }

  @Get('/clear')
  @ApiOperation({ description: `[DEBUG]] delete all pizza's` })
  @ApiOkResponse({
    status: 200,
  })
  public async clearAllPizzas() {
    await this.pizzaService.clearAll();
  }
}

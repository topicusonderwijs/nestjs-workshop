import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, UsePipes } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/pizza')
//[HINT] NestJS will add all controllers to the "default" section.
//If you want a different section you will need to tell NestJS that this with some annotation
//https://docs.nestjs.com/openapi/operations
export class PizzaController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will lookup all constructor parameters
     * as dependencies. It knows about dependencies trough its module definition (pizza.module.ts)
     */
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

    @Get(':id')
    @ApiOperation({ description: `Get a pizza by id` })
    @ApiOkResponse({
        status: 200,
        description: `Pizza for a specific id`,
        type: Pizza,
    })
    public async getPizzaById(@Param('id') id: number): Promise<Pizza> {
        const pizza = await this.pizzaService.getPizzaById(id);
        if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);
        return pizza;
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
}

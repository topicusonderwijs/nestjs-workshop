import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, UsePipes } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller('/pizza')
@ApiTags('Pizza')
export class PizzaController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will lookup all constructor parameters
     * as dependencies. It knows about dependencies trough its module definition (pizza.module.ts)
     */
    constructor(@InjectPinoLogger(PizzaController.name) private readonly logger: PinoLogger, private readonly pizzaService: PizzaService) {
        this.logger.debug('PizzaController created');
    }

    @Get()
    @ApiOperation({ description: `Get all pizza's` })
    @ApiOkResponse({
        status: 200,
        description: `List of all pizza's`,
        type: Pizza,
        isArray: true,
    })
    public async getAllPizzas(): Promise<Pizza[]> {
        this.logger.info('getAllPizzas endpoint called');
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
        this.logger.info('getPizzaById endpoint called with id %d', id);
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
        this.logger.info('addPizza endpoint called with pizza %o', pizza);
        return this.pizzaService.addPizza(pizza);
    }

    @Get('/clear')
    @ApiOperation({ description: `[DEBUG] delete all pizza's` })
    @ApiOkResponse({
        status: 200,
    })
    public async clearAllPizzas() {
        await this.pizzaService.clearAll();
    }
}

import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';
import { PizzaNameValidationPipe } from '../pipes/pizza-name.pipe';
import { PizzaDuplicateNameValidationPipe } from '../pipes/pizza-duplicate-name.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { JwtAuthGuard } from '../../auth/guards/JwtAuthGuard';

@Controller('/pizza')
@ApiTags('Pizza')
@UseGuards(JwtAuthGuard)
export class PizzaController {
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
        return this.pizzaService.getALlPizzas();
    }

    @Get(':id')
    @ApiOperation({ description: `Get a pizza by id` })
    @ApiOkResponse({
        status: 200,
        description: `Pizza for a specific id`,
        type: Pizza,
    })
    @ApiNotFoundResponse({ description: 'Pizza could not be found' })
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

    @Get('/clear')
    @ApiOperation({ description: `[DEBUG]] delete all pizza's` })
    @ApiOkResponse({
        status: 200,
    })
    public async clearAllPizzas() {
        await this.pizzaService.clearAll();
    }
}

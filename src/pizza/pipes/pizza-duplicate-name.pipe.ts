import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../entities/pizza.entity';

@Injectable()
export class PizzaDuplicateNameValidationPipe implements PipeTransform {
    constructor(private readonly pizzaService: PizzaService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const pizza = await this.pizzaService.getPizzaByName((value as Pizza).name);
        if (pizza) {
            throw new BadRequestException('Pizza name is not unique');
        }
        return value;
    }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PizzaNameValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value || !value.hasOwnProperty('name') || !value['name']) {
            throw new BadRequestException('Pizza name is required');
        }
        return value;
    }
}

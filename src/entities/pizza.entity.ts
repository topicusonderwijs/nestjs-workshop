import { IsArray, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

//[HINT] Since this entity is used in your REST endpoint you will need to document this
//https://docs.nestjs.com/openapi/types-and-parameters
export class Pizza {
    id: number;

    @IsString()
    name: string;

    @IsPositive()
    size: number;

    @Type(() => Review)
    @IsArray()
    @IsOptional()
    @ValidateNested()
    reviews: Review[];
}

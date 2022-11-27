import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

export class Pizza {
    id: number;

    @IsString()
    name: string;

    size: number;

    @Type(() => Review)
    @IsArray()
    @IsOptional()
    @ValidateNested()
    reviews: Review[];
}

import { IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

export class Pizza {
    id: number;

    @IsString()
    name: string;

    size: number;

    //[HINT] We need to validate that this is a array
    @Type(() => Review)
    @ValidateNested()
    reviews: Review[];
}

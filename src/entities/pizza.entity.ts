import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

export class Pizza {
    @ApiProperty({ example: 1, description: 'The unique id of this pizza' })
    id: number;

    @IsString()
    @ApiProperty({
        example: 'Salami',
        description: 'The unique name of this pizza',
    })
    name: string;

    @ApiProperty({ example: 25, description: 'The size of this pizza in cm' })
    @IsPositive()
    size: number;

    @ApiProperty({
        description: 'List of review for this pizza',
        type: 'array',
        items: { allOf: [{ $ref: getSchemaPath(Review) }] },
        minItems: 0,
        required: false,
    })
    @Type(() => Review)
    @IsArray()
    @IsOptional()
    @ValidateNested()
    reviews: Review[];
}

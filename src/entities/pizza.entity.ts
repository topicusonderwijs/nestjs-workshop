import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

//[HINT] We will need to configure this as an Entity
export class Pizza {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The unique id of this pizza' })
    id: number;

    @Column()
    @ApiProperty({
        example: 'Salami',
        description: 'The unique name of this pizza',
    })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({ example: 25, description: 'The size of this pizza in cm' })
    @IsPositive()
    size: number;

    //[HINT] this is a OneToMany, without configuration typeorm wont understand this relation.
    // Alo make sure when we insert/update/delete pizza's we cascade this to this relation
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

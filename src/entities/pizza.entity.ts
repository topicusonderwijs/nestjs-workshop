import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Review } from './review.entity';
import { Type } from 'class-transformer';

@Entity()
@ApiExtraModels(Review)
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

    @OneToMany(() => Review, (review) => review.pizza, { cascade: ['insert', 'update', 'remove'] })
    @ApiProperty({
        description: 'List of review for this pizza',
        type: 'array',
        items: { allOf: [{ $ref: getSchemaPath(Review) }] },
        minItems: 0,
        required: false,
    })
    @Type(() => Review)
    @IsArray()
    @ValidateNested()
    reviews: Review[];
}

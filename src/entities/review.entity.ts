import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString, Max, Min } from 'class-validator';

@Entity()
export class Review {
    @ApiProperty({ example: 1, description: 'The unique id of this review' })
    id: number;

    @ApiProperty({
        example: 'Henk',
        description: 'The name of the reviewer',
    })
    @IsString()
    reviewedBy: string;

    @ApiProperty({
        example: '3',
        description: 'Number of stars for this pizza (values between 0 and 5)',
    })
    @Min(0)
    @Max(5)
    @IsPositive()
    stars: number;
}

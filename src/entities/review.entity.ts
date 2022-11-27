import { IsPositive, IsString, Max, Min } from 'class-validator';

export class Review {
    id: number;

    @IsString()
    reviewedBy: string;

    @Min(0)
    @Max(5)
    @IsPositive()
    stars: number;
}

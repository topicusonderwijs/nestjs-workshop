import { IsPositive, IsString, Max, Min } from 'class-validator';

//[HINT] Since this entity is used in your REST endpoint you will need to document this
//https://docs.nestjs.com/openapi/types-and-parameters
export class Review {
    id: number;

    @IsString()
    reviewedBy: string;

    @Min(0)
    @Max(5)
    @IsPositive()
    stars: number;
}

import { IsString } from 'class-validator';

export class Review {
    id: number;

    @IsString()
    reviewedBy: string;

    //[HINT] We only allow star values between 0 and 5
    stars: number;
}

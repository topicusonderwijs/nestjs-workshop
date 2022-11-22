import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post(':pizzaId')
    @HttpCode(201)
    public async submitReview(@Param('pizzaId') pizzaId: string, @Body() review: Review): Promise<Review> {
        return this.reviewService.submitReview(parseInt(pizzaId), review);
    }
}

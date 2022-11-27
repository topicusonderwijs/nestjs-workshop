import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
export class ReviewController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will lookup all constructor parameters
     * as dependencies. It knows about dependencies trough its module definition (pizza.module.ts)
     */
    constructor(private readonly reviewService: ReviewService) {}

    @Post(':pizzaId')
    public async submitReview(@Param('pizzaId') pizzaId: string, @Body() review: Review): Promise<Review> {
        return this.reviewService.submitReview(parseInt(pizzaId), review);
    }
}

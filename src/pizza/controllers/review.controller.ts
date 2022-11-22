import { Body, Param, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

/**
 * [HINT]
 * The PizzaModule (pizza.module.ts) defines all dependencies (controllers and providers).
 * But we also need to let NestJS know that this class is an actual controller.
 * NestJS does this by looking for annotation on classes
 *
 * Also make sure, the review controller uses the /review endpoint
 * https://docs.nestjs.com/controllers
 */
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

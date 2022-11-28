import { Body, Controller, Param, ParseIntPipe, Post, UsePipes } from "@nestjs/common";
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
export class ReviewController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will look up all constructor parameters
     * as dependencies. It knows about dependencies through its module definition (pizza.module.ts)
     */
    constructor(private readonly reviewService: ReviewService) {}

    // By default, query parameters are injected as strings, but we have to safely parse it to a number.
    @Post(':pizzaId')
    public async submitReview(@Param('pizzaId') pizzaId: string, @Body() review: Review): Promise<Review> {
        return this.reviewService.submitReview(+pizzaId, review);
    }
}

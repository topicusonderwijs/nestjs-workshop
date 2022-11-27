import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
//[HINT] NestJS will add all controllers to the "default" section.
//If you want a different section you will need to tell NestJS that this with some annotation
//https://docs.nestjs.com/openapi/operations
export class ReviewController {
    /**
     * NestJS uses constructor dependency injection. So when a controller is created by NestJS it will lookup all constructor parameters
     * as dependencies. It knows about dependencies trough its module definition (pizza.module.ts)
     */
    constructor(private readonly reviewService: ReviewService) {}

    @Post(':pizzaId')
    @HttpCode(201)
    @ApiOperation({ description: `Create a new review for a pizza` })
    @ApiCreatedResponse({ description: `The created review`, type: Review })
    @ApiBadRequestResponse({ status: 400, description: 'When validation fails.' })
    public async submitReview(@Param('pizzaId') pizzaId: string, @Body() review: Review): Promise<Review> {
        return this.reviewService.submitReview(parseInt(pizzaId), review);
    }
}

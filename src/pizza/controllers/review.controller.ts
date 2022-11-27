import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
@ApiTags('Review')
export class ReviewController {
    constructor(
        @InjectPinoLogger(ReviewController.name) private readonly logger: PinoLogger,
        private readonly reviewService: ReviewService,
    ) {
        this.logger.debug('ReviewController created');
    }

    @Post(':pizzaId')
    @HttpCode(201)
    @ApiOperation({ description: `Create a new review for a pizza` })
    @ApiCreatedResponse({ description: `The created review`, type: Review })
    @ApiBadRequestResponse({ status: 400, description: 'When validation fails.' })
    public async submitReview(@Param('pizzaId') pizzaId: number, @Body() review: Review): Promise<Review> {
        this.logger.info('submitReview endpoint called with id %d and review %o', pizzaId, review);
        return this.reviewService.submitReview(pizzaId, review);
    }
}

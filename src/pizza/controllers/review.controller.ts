import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';
import { JwtAuthGuard } from '../../auth/guards/JwtAuthGuard';

@Controller('/review')
@ApiTags('Review')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

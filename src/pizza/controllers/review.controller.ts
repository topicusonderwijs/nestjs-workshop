import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { Review } from '../../entities/review.entity';

@Controller('/review')
@ApiTags('Review')
export class ReviewController {
    //[Hint] Inject a PinoLogger, since we are using a lib use their custom annotation `@InjectPinoLogger`
    constructor(private readonly reviewService: ReviewService) {
        this.logger.debug('ReviewController created');
    }

    @Post(':pizzaId')
    @HttpCode(201)
    @ApiOperation({ description: `Create a new review for a pizza` })
    @ApiCreatedResponse({ description: `The created review`, type: Review })
    @ApiBadRequestResponse({ status: 400, description: 'When validation fails.' })
    public async submitReview(@Param('pizzaId') pizzaId: number, @Body() review: Review): Promise<Review> {
        //TODO add logging here with the pizzaId and review in the log
        return this.reviewService.submitReview(pizzaId, review);
    }
}

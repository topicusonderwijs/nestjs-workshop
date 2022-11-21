import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Review } from '../../entities/review.entity';
import { PizzaService } from './pizza.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private pizzaService: PizzaService,
        @InjectPinoLogger(ReviewService.name) private readonly logger: PinoLogger,
    ) {
        this.logger.debug('PizzaService created');
    }

    public async submitReview(pizzaId: number, review: Review): Promise<Review> {
        const pizza = await this.pizzaService.getPizzaById(pizzaId);
        if (!pizza) throw new BadRequestException(`No pizza found with id ${pizzaId}`);
        review.pizza = pizza;
        review = await this.reviewRepository.save(review);
        return review;
    }
}

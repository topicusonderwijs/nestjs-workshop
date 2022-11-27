import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { PizzaService } from './pizza.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private pizzaService: PizzaService,
    ) {}

    public async submitReview(pizzaId: number, review: Review): Promise<Review> {
        const pizza = await this.pizzaService.getPizzaById(pizzaId);
        if (!pizza) throw new NotFoundException(`No pizza found with id ${pizzaId}`);
        review.pizza = pizza;
        review = await this.reviewRepository.save(review);
        return await this.reviewRepository.findOne({ where: { id: review.id }, relations: ['pizza'] });
    }
}

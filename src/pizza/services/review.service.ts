import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '../../entities/review.entity';
import { PizzaService } from './pizza.service';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ReviewService {
    constructor(private pizzaService: PizzaService) {}

    public async submitReview(pizzaId: number, review: Review): Promise<Review> {
        const pizza = await this.pizzaService.getPizzaById(pizzaId);
        if (!pizza) throw new NotFoundException(`No pizza found with id ${pizzaId}`);

        const reviewIds = (await this.pizzaService.getALlPizzas()).flatMap((p) => p.reviews).map((review) => review.id);
        const maxId = isEmpty(reviewIds) ? 0 : Math.max(...reviewIds);
        review.id = maxId + 1;
        pizza.reviews.push(review);
        return review;
    }
}

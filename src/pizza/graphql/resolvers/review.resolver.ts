import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { Review } from "../models/review.model";
import { ReviewService } from "../../services/review.service";
import { ReviewInput } from "../models/review-input.model";

@Resolver(of => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(returns => Review, )
  reviewCreate(@Args( { name: 'pizzaId', type: () => Int}) pizzaId: number,
               @Args({ name: 'reviewInput', type: () => ReviewInput}) reviewInput: ReviewInput): Promise<Review> {
    return this.reviewService.submitReview(pizzaId, { ...reviewInput, id: null, pizza: null, reviewedBy: 'Test' })
  }
}

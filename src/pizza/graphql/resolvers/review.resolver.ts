import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { Review } from "../models/review.model";
import { ReviewService } from "../../services/review.service";
import { ReviewInput } from "../models/review-input.model";
import { UseGuards } from "@nestjs/common";
import { GraphqlJwtAuthGuard } from "../../../auth/graphql/guards/graphql-jwt-auth.guard";

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(of => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(returns => Review, )
  createReview(@Args( { name: 'pizzaId', type: () => Int}) pizzaId: number,
               @Args({ name: 'reviewInput', type: () => ReviewInput}) reviewInput: ReviewInput): Promise<Review> {
    return this.reviewService.submitReview(pizzaId, { ...reviewInput, id: null, pizza: null, reviewedBy: 'Test' })
  }
}

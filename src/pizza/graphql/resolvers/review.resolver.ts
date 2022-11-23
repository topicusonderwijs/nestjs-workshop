import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { Review } from "../models/review.model";
import { ReviewService } from "../../services/review.service";
import { ReviewInput } from "../models/review-input.model";
import { Req, UseGuards } from "@nestjs/common";
import { GraphqlJwtAuthGuard } from "../../../auth/graphql/guards/graphql-jwt-auth.guard";
import { CurrentUser } from "../../../auth/helpers/current-user.helper";

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(of => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(returns => Review, )
  createReview(@Args( { name: 'pizzaId', type: () => Int}) pizzaId: number,
               @Args({ name: 'reviewInput', type: () => ReviewInput}) reviewInput: ReviewInput,
               @CurrentUser() user: any): Promise<Review> {
    return this.reviewService.submitReview(pizzaId, { ...reviewInput, id: null, pizza: null, reviewedBy: user.username })
  }
}

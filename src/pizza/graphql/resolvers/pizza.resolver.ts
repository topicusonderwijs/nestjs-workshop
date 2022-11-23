import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Pizza } from "../models/pizza.model";
import { PizzaService } from "../../services/pizza.service";
import { Review } from "../models/review.model";
import { ReviewService } from "../../services/review.service";
import { PizzaInput } from "../models/pizza-input.model";
import { UseGuards, UsePipes } from "@nestjs/common";
import { GraphqlJwtAuthGuard } from "../../../auth/graphql/guards/graphql-jwt-auth.guard";
import { PizzaDuplicateNameValidationPipe } from "../../pipes/pizza-duplicate-name.pipe";

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(of => Pizza)
export class PizzaResolver {
  constructor(private readonly pizzaService: PizzaService,
              private readonly reviewService: ReviewService) {}

  @Query(returns => [Pizza], {name: 'pizzas', description: `Get all pizza's`})
  async getAllPizzas(): Promise<Pizza[]> {
    return this.pizzaService.getALlPizzas();
  }

  @UsePipes(PizzaDuplicateNameValidationPipe)
  @Mutation(returns => Pizza)
  async createPizza(@Args({name: 'pizzaInput', type: () => PizzaInput}) pizzaInput: PizzaInput): Promise<Pizza> {
    return this.pizzaService.addPizza({ ...pizzaInput, id: null, reviews: [] });
  }

  @ResolveField(returns => [Review])
  async reviews(@Parent() pizza: Pizza): Promise<Review[]> {
      return this.reviewService.getReviewsByPizzaId(pizza.id);
  }
}

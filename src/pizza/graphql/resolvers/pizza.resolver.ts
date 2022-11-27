import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Pizza } from "../models/pizza.model";
import { PizzaService } from "../../services/pizza.service";
import { Review } from "../models/review.model";
import { ReviewService } from "../../services/review.service";
import { UseGuards, UsePipes } from "@nestjs/common";
import { GraphqlJwtAuthGuard } from "../../../auth/graphql/guards/graphql-jwt-auth.guard";
import { PizzaDuplicateNameValidationPipe } from "../../pipes/pizza-duplicate-name.pipe";
import { CreatePizzaDto } from "../models/create-pizza-dto.model";
import { UpdatePizzaDto } from "../models/update-pizza-dto.model";

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(of => Pizza)
export class PizzaResolver {
  constructor(private readonly pizzaService: PizzaService,
              private readonly reviewService: ReviewService) {}

  @Query(returns => [Pizza], {name: 'pizzas', description: `Get all pizza's`})
  async getAllPizzas(): Promise<Pizza[]> {
    return this.pizzaService.getALlPizzas();
  }

  @Query(returns => Pizza, {name: 'pizza', description: `Get a pizza by its id`})
  async getPizzaById(@Args({ name: 'pizzaId', type: () => Int}) pizzaId: number): Promise<Pizza> {
    return this.pizzaService.getPizzaById(pizzaId);
  }

  @UsePipes(PizzaDuplicateNameValidationPipe)
  @Mutation(returns => Pizza)
  async createPizza(@Args({name: 'pizzaInput', type: () => CreatePizzaDto}) pizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzaService.addPizza({ ...pizzaDto, id: null, reviews: [] });
  }

  @UsePipes(PizzaDuplicateNameValidationPipe)
  @Mutation(returns => Pizza)
  async updatePizza(@Args({name: 'pizzaId', type: () => Int}) pizzaId: number,
                    @Args({name: 'pizzaInput', type: () => UpdatePizzaDto}) pizzaDto: UpdatePizzaDto): Promise<Pizza> {
    return this.pizzaService.updatePizza(pizzaId, pizzaDto);
  }

  @ResolveField(returns => [Review])
  async reviews(@Parent() pizza: Pizza): Promise<Review[]> {
      return this.reviewService.getReviewsByPizzaId(pizza.id);
  }
}

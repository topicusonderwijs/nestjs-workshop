import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Review } from "./review.model";

@ObjectType()
export class Pizza {
  @Field(type => Int, {description: 'The unique id of this pizza'})
  id: number;

  @Field(type => String, {description: 'The unique name of this pizza',})
  name: string;

  @Field(type => Int, { description: 'The size of this pizza in cm'})
  size: number;

  @Field(type => [Review], { description: 'List of review for this pizza'})
  reviews: Review[];
}

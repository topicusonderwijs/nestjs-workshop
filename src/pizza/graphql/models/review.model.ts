import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Pizza } from "./pizza.model";

@ObjectType()
export class Review {
  @Field(type => Int, {description: 'The unique id of this review'})
  id: number;

  @Field(type => String, {description: 'The name of the reviewer'})
  reviewedBy: string;

  @Field(type => Pizza, { description: 'The pizza this review is for' })
  pizza: Pizza;

  @Field(type => Int, { description: 'Number of stars for this pizza (values between 0 and 5)'})
  stars: number;
}

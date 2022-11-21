import { Field, InputType, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

@InputType()
export class ReviewInput {
  @Min(1)
  @Max(5)
  @Field(type => Int, { description: 'Number of stars for this pizza (values between 0 and 5)'})
  stars: number;
}

import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreatePizzaDto {
  @Field(type => String, {description: 'The unique name of this pizza',})
  name: string;

  @Field(type => Int, { description: 'The size of this pizza in cm'})
  size: number;
}

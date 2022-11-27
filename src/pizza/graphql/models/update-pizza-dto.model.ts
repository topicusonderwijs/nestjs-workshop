import { InputType, PartialType } from "@nestjs/graphql";
import { CreatePizzaDto } from "./create-pizza-dto.model";

@InputType()
export class UpdatePizzaDto extends PartialType(CreatePizzaDto){}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

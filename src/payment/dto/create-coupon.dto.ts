import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly percent: number;

  @IsNumber()
  @IsOptional()
  readonly amount: number;
}

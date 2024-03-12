import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

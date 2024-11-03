import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly age: string;
  @IsNumber()
  readonly name: number;
  @IsNumber()
  readonly country: number;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

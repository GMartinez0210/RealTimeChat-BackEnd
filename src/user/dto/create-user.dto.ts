import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsEmail,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateUserDto)
  contacts?: CreateUserDto[];
}

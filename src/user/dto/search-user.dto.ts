import { IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;
}

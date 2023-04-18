import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?:|(?=.*\W+)).*$/, {
    message:
      'The password must have a uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;
}

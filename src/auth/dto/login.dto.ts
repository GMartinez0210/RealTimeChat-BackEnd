import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
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
}

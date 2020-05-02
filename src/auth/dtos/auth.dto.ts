import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  accessToken?: string;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  profile?: string;
}

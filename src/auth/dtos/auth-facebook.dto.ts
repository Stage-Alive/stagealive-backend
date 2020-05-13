import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthFacebookDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The facebook id of user', nullable: true })
  facebookId: string;
}

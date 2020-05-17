import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ nullable: false })
  email: string;
}

import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreContactFormDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ nullable: false })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  message: string;
}

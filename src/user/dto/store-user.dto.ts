import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The type of user', nullable: false })
  userTypeId: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The password of user', nullable: false })
  password: string;
}

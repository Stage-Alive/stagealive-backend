import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;

  @ApiProperty({ description: 'The type of user', nullable: false })
  userTypeId: string;

  @IsOptional()
  @ApiProperty({ description: 'The password of user', nullable: false })
  profilePhoto?: string;
}

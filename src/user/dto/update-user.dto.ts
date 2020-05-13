import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsDate, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ description: 'The name of user', nullable: true })
  name: string;

  @IsOptional()
  @ApiProperty({ description: 'The password of user', nullable: true })
  profilePhoto: string;

  @IsOptional()
  @ApiProperty({ description: 'The gender of user', nullable: true })
  gender: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'The birthdate of user', nullable: true })
  birthdate: string;

  @IsOptional()
  @ApiProperty({ description: 'The gender of user', nullable: true })
  password: string;
}

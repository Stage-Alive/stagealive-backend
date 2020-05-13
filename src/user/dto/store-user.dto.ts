import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The type of user', nullable: false })
  userTypeId: string;

  @IsOptional()
  @ApiProperty({ description: 'The password of user', nullable: true })
  password: string;

  @IsOptional()
  @ApiProperty({ description: 'The url of profile photo', nullable: true })
  profilePhoto: string;

  @IsOptional()
  @ApiProperty({ description: 'The facebook id of user', nullable: true })
  facebookId: string;
}

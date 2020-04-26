import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsOptional, IsIn, IsInt, IsString } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  email: string;
}

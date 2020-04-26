import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;
  
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;
  
  @IsOptional()
  @ApiProperty({ description: 'The type of user', nullable: false })
  userTypeId: string

}

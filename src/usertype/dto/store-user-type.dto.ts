import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StoreUserTypeDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The type of user', nullable: false })
  type: string;
}

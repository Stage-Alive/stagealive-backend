import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrivateGroupDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;
}

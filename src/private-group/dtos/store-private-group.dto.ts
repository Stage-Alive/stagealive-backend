import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePrivateGroupDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;
}

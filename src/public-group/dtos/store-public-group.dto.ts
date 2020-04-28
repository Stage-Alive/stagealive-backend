import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePublicGroupDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  regionId: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;
}

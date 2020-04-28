import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  region: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  state: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  city: string;
}

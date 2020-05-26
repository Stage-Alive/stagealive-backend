import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchLiveDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: true, default: false })
  highlighted: number;
}

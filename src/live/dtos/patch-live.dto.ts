import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchLiveDto {
  @IsOptional()
  @ApiProperty({ nullable: true, default: false })
  highlighted: number;

  @IsOptional()
  @ApiProperty({ nullable: true })
  description: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  link: string;
}

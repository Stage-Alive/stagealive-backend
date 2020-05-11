import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePublicGroupDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  regionId: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  @IsOptional()
  @ApiProperty({ nullable: false, description: 'live which this group belongs to' })
  liveId: string;
}

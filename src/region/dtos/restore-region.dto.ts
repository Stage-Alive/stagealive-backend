import { ApiProperty } from '@nestjs/swagger';

export class RestoreRegionDto {
  @ApiProperty({ description: 'The id of region', nullable: false })
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class RestoreLiveDto {
  @ApiProperty({ description: 'The id of live', nullable: false })
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class RestoreArtistDto {
  @ApiProperty({ description: 'The id of artist', nullable: false })
  id: string;
}

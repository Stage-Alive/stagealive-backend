import { ApiProperty } from '@nestjs/swagger';

export class RestorePrivateGroupDto {
  @ApiProperty({ description: 'The id of public group', nullable: false })
  id: string;
}

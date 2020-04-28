import { ApiProperty } from '@nestjs/swagger';

export class RestorePublicGroupDto {
  @ApiProperty({ description: 'The id of public group', nullable: false })
  id: string;
}

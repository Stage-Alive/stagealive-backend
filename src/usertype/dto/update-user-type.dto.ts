import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserTypeDto {
  @ApiProperty({ description: 'The type of user', nullable: false })
  type: string;
}

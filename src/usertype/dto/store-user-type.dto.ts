import { ApiProperty } from '@nestjs/swagger';

export class StoreUserTypeDto {
  @ApiProperty({ description: 'The type of user', nullable: false })
  type: string;
}

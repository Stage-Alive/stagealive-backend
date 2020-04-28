import { ApiProperty } from '@nestjs/swagger';

export class RestoreUserTypeDto {
  @ApiProperty({ description: 'The id of user type', nullable: false })
  id: string;
}

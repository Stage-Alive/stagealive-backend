import { ApiProperty } from '@nestjs/swagger';

export class RestoreUserDto {
  @ApiProperty({ description: 'The id of user', nullable: false })
  id: string;
}

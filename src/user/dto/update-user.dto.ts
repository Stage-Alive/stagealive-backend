import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of user', nullable: false })
  name: string;

  @ApiProperty({ description: 'The email of user', nullable: false })
  email: string;

  @ApiProperty({ description: 'The type of user', nullable: false })
  userTypeId: string;
}

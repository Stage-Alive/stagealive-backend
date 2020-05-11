import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreChatDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  liveId: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  groupId: string;
}

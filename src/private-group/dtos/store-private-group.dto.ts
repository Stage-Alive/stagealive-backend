import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePrivateGroupDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false, description: 'live which this group belongs to' })
  liveId: string;
}

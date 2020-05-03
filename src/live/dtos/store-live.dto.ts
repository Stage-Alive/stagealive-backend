import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreLiveDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  link: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  // @IsNotEmpty()
  @ApiProperty({ nullable: false })
  artist_id: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  start_at: string;
}

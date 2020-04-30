import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreLiveDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  link: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;
}

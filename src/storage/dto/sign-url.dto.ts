import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUrlDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false, description: 's3 path' })
  path: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false, description: 's3 path' })
  type: string;
}

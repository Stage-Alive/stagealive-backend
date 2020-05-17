import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  rememberToken: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  password: string;
}

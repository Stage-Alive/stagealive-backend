import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreMessageDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  chatId: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  text: string;
}

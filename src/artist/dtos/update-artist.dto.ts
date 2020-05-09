import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @IsOptional()
  @ApiProperty({ nullable: true })
  contactPhone: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  contactEmail: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  name: string;
}

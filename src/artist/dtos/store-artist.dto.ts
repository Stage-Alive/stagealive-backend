import { IsOptional, IsEmail, isEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreArtistDto {
  @IsOptional()
  @IsPhoneNumber('BR')
  @ApiProperty({ nullable: true })
  contactPhone: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ nullable: true })
  contactEmail: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  name: string;
}

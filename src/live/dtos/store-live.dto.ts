import { IsNotEmpty, IsOptional, IsDateString, IsString, maxLength, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreLiveDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  link: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  banner: string;

  @IsOptional()
  @ApiProperty({ nullable: false })
  artistsIds: string[];

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ nullable: false })
  startAt: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: true })
  mainBanner: string;

  @IsOptional()
  @ApiProperty({ nullable: false })
  secondaryBanner: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  groupsIds: string[];

  @IsString()
  @ApiProperty({ nullable: false, maxLength: 30 })
  description: string;

  @IsOptional()
  @ApiProperty({ nullable: true, default: false })
  highlighted: number;
}

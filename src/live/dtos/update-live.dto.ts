import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLiveDto {
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  link: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;

  @IsOptional()
  @ApiProperty({ nullable: false })
  artistsIds: string[];

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  startAt: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  mainBanner: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  secondaryBanner: string;

  @IsOptional()
  @ApiProperty({ nullable: false })
  groupsIds: string[];

  @IsString()
  @ApiProperty({ nullable: false, maxLength: 30 })
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ nullable: true, default: false })
  highlighted: boolean;
}

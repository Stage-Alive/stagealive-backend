import { IsNotEmpty, IsOptional } from 'class-validator';
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
  @ApiProperty({ nullable: false })
  startAt: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  mainBanner: string;

  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  secondaryBanner: string;
}

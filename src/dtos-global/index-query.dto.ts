import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min, IsNumber } from 'class-validator';

export class IndexQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    description: 'The current page of pagination',
    default: 1,
    minimum: 1,
  })
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
  })
  limit: number;

  @IsOptional()
  @ApiProperty({
    description: 'highlighted',
    default: false,
  })
  highlighted: number;
}

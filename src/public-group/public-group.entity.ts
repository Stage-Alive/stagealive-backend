import { Entity, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { RegionEntity } from 'src/region/region.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('public_groups')
export class PublicGroupEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of region', nullable: false })
  id: string;

  @ManyToOne(
    () => RegionEntity,
    regionEntity => regionEntity.publicGroups,
  )
  @JoinColumn({ name: 'region_id', referencedColumnName: 'id' })
  region: RegionEntity;

  @Column({ name: 'region_id', type: 'uuid' })
  @ApiProperty({ description: 'The id of region', nullable: false })
  regionId: string;


}

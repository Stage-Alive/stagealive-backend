import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { RegionEntity } from 'src/region/region.entity';

@Entity('public_groups')
export class PublicGroupEntity {
  @ManyToOne(
    () => RegionEntity,
    regionEntity => regionEntity.publicGroups,
  )
  @JoinColumn({ name: 'region_id', referencedColumnName: 'id' })
  region: RegionEntity;

  @Column({ name: 'region_id', type: 'uuid' })
  regionId: string;
}

import {
  Entity,
  ManyToOne,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { RegionEntity } from 'src/region/region.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from 'src/group/group.entity';

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

  @Column({ name: 'region_id', type: 'uuid', nullable: true })
  @ApiProperty({ description: 'The id of region', nullable: false })
  regionId: string;

  // @Column({ type: 'varchar', length: 255 })
  // name: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;

  @OneToOne(type => GroupEntity, { eager: true })
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: GroupEntity;

  // @Column({ name: 'group_id' })
  // groupId: string;
}

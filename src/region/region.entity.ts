import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PublicGroupEntity } from 'src/public-group/public-group.entity';

@Entity('regions')
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of region', nullable: false })
  id: string;

  @Column({ name: 'region' })
  @ApiProperty({ description: 'Region', nullable: false })
  region: string;

  @Column({ name: 'state' })
  @ApiProperty({ description: 'State', nullable: false })
  state: string;

  @Column({ name: 'city' })
  @ApiProperty({ description: 'City', nullable: false })
  city: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;

  @OneToMany(
      () => PublicGroupEntity,
      publicGroupEntity => publicGroupEntity.region
  )
  publicGroups: PublicGroupEntity[];
}

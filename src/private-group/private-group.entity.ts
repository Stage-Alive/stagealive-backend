import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from 'src/group/group.entity';

@Entity('private_groups')
export class PrivateGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of region', nullable: false })
  id: string;

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
}

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ChatEntity } from 'src/chat/chat.entity';
import { LiveEntity } from 'src/live/live.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of group', nullable: false })
  id: string;

  @OneToMany(
    () => ChatEntity,
    chatEntity => chatEntity.group,
  )
  chats: ChatEntity[];

  @ManyToMany(
    type => LiveEntity,
    live => live.groups,
    { nullable: true },
  )
  lives: LiveEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;

  @Column({ length: 255 })
  name: string;
}

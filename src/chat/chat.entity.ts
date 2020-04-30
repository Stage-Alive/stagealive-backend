import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../message/message.entity';
import { LiveEntity } from '../live/live.entity';
import { GroupEntity } from 'src/group/group.entity';

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of chats', nullable: false })
  id: string;

  @OneToMany(
    () => MessageEntity,
    messageEntity => messageEntity.chat,
  )
  messages: MessageEntity[];

  @ManyToOne(
    () => LiveEntity,
    liveEntity => liveEntity.chats,
  )
  @JoinColumn({ name: 'live_id', referencedColumnName: 'id' })
  live: LiveEntity;

  @Column({ name: 'live_id', type: 'uuid' })
  @ApiProperty({ description: 'The id of live', nullable: false })
  liveId: string;

  @ManyToOne(
    () => GroupEntity,
    groupEntity => groupEntity.chats,
  )
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: GroupEntity;

  @Column({ name: 'group_id', type: 'uuid' })
  @ApiProperty({ description: 'The id of group', nullable: false })
  groupId: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;
}

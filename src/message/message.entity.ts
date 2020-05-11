import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ChatEntity } from '../chat/chat.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'messages', orderBy: { createdAt: 'DESC' } })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of messages', nullable: false })
  id: string;

  @ManyToOne(
    () => ChatEntity,
    chatEntity => chatEntity.messages,
  )
  @JoinColumn({ name: 'chat_id', referencedColumnName: 'id' })
  chat: ChatEntity;

  @Column({ name: 'chat_id', type: 'uuid' })
  @ApiProperty({ description: 'The id of chat', nullable: false })
  chatId: string;

  @ManyToOne(
    () => UserEntity,
    userEntity => userEntity.messages,
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  @ApiProperty({ description: 'The id of user', nullable: false })
  userId: string;

  @Column({ name: 'text' })
  @ApiProperty({ description: 'The registration date', nullable: false })
  text: string;

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

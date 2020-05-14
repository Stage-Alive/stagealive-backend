import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { ChatEntity } from 'src/chat/chat.entity';
import { LiveEntity } from 'src/live/live.entity';

@Entity({ name: 'groups', orderBy: { createdAt: 'DESC' } })
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

  @ManyToMany(
    type => UserEntity,
    user => user.groups,
    { nullable: true, lazy: true },
  )
  @JoinTable({
    name: 'groups_users',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}

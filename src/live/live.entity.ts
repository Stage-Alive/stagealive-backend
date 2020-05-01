import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ChatEntity } from 'src/chat/chat.entity';
import { GroupEntity } from 'src/group/group.entity';

@Entity('lives')
export class LiveEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of lives', nullable: false })
  id: string;

  @Column({ name: 'link' })
  @ApiProperty({
    description: 'The url from streaming service',
    nullable: false,
  })
  link: string;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Name', nullable: false })
  name: string;

  @OneToMany(
    () => ChatEntity,
    ChatEntity => ChatEntity.live,
  )
  chats: ChatEntity[];

  @ManyToMany(
    type => GroupEntity,
    group => group.lives,
    { nullable: true },
  )
  @JoinTable({
    name: 'groups_lives',
    joinColumn: {
      name: 'live_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: GroupEntity[];

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

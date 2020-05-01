import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';

@Entity('user_types')
export class UserTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of the activity slide', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'Type of users', nullable: false })
  type: string;

  @OneToMany(
    type => UserEntity,
    userEntity => userEntity.userType,
  )
  users: UserEntity[];

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

import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

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
}

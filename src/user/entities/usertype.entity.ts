import { Entity, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_types')
export class UserTypeEntity {
  @Column()
  @ApiProperty({ description: 'Type of users', nullable: false })
  type: string;

  @OneToMany(
    type => UserEntity,
    userEntity => userEntity.userType,
  )
  users: UserEntity[];
}

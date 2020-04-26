import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}

import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserTypeEntity } from 'src/usertype/usertype.entity';

@Entity({ name: 'users', orderBy: { createdAt: 'ASC' } })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of the activity slide', nullable: false })
  id: string;

  @Column({ name: 'remember_token', nullable: true, default: null })
  rememberToken: string;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Name of user', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  @ApiProperty({ description: 'Email of user', nullable: false })
  email: string;

  @ManyToOne(
    () => UserTypeEntity,
    userEntity => userEntity.users,
  )
  @JoinColumn({ name: 'user_type_id', referencedColumnName: 'id' })
  userType: UserTypeEntity;

  @Column({ name: 'user_type_id', type: 'uuid' })
  @ApiProperty({ description: 'The id of the type', nullable: false })
  userTypeId: string;

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

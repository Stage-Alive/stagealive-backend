import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserTypeEntity } from 'src/usertype/usertype.entity';
import { createHmac } from 'crypto';
import { GroupEntity } from 'src/group/group.entity';
import { MessageEntity } from 'src/message/message.entity';
import { ConfigConst } from 'src/constant/config.const';
import { LiveEntity } from 'src/live/live.entity';
import { PrivateGroupEntity } from 'src/private-group/private-group.entity';

@Entity({ name: 'users', orderBy: { createdAt: 'ASC' } })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of the activity slide', nullable: false })
  id: string;

  @Column({ name: 'remember_token', nullable: true, default: null })
  rememberToken: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Name of user', nullable: false })
  name: string;

  @Column({
    name: 'email',
    nullable: true,
    unique: true,
    type: 'varchar',
    length: 255,
  })
  @ApiProperty({ description: 'Email of user', nullable: true })
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

  @OneToMany(
    () => MessageEntity,
    messageEntity => messageEntity.user,
  )
  messages: MessageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @ManyToMany(
    type => GroupEntity,
    group => group.users,
    { nullable: true },
  )
  groups: GroupEntity[];

  @ManyToMany(
    type => LiveEntity,
    live => live.users,
    { nullable: true },
  )
  lives: LiveEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = createHmac(ConfigConst.CRIPTO_ALGORITHM, this.password).digest(
        ConfigConst.ENCODE_CRIPTO_ALGORITHM,
      );
    }
  }

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  facebookId: string;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhoto: string;

  @OneToMany(
    () => PrivateGroupEntity,
    privateGroupEntity => privateGroupEntity.createdBy,
  )
  createdPrivateChats: PrivateGroupEntity[];

  @Column({ type: 'varchar', name: 'gender', nullable: true })
  gender: string;

  @Column({ type: 'datetime', name: 'birthdate', nullable: true })
  birthdate: string;
}

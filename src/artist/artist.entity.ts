import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LiveEntity } from 'src/live/live.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of artists', nullable: false })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'The registration date', nullable: true })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'The  updation date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'The deletion date', nullable: true })
  deletedAt: string;

  @ManyToMany(
    type => LiveEntity,
    live => live.artists,
    { nullable: true },
  )
  lives: LiveEntity[];

  @Column({ name: 'contact_phone', nullable: true })
  contactPhone: string;

  @Column({ name: 'contact_email', nullable: true })
  contactEmail: string;

  @Column({ name: 'name' })
  name: string;
}

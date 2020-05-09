import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contact_forms')
export class ContactFormEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The id of forms', nullable: false })
  id: number;

  @Column({ name: 'name', nullable: false })
  @ApiProperty({ description: 'The name who wants to talk to us', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  @ApiProperty({ description: 'The email who wants to talk to us', nullable: false })
  email: string;

  @Column({ name: 'message', type: 'text', nullable: false })
  @ApiProperty({ description: 'The email who wants to talk to us', nullable: false })
  message: string;
}

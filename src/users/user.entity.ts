import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  first_name: string;

  @Column({ length: 25 })
  last_name: string;

  @Column()
  email: number;
}

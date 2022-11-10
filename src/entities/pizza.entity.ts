import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;
}

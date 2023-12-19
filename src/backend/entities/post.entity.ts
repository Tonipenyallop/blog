import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  author!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  context?: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;

  @Column()
  user_id!: number;
}

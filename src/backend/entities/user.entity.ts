import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 50,
  })
  username!: string;

  @Column({ nullable: true })
  current_challenge?: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  authenticator_id?: string;

  @Column()
  email!: string;
}

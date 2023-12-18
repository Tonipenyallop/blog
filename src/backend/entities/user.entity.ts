import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { AppDataSource } from "../db";

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
  authenticator_id?: number;

  @Column()
  email!: string;
}

// export const UserEntity = AppDataSource.getRepository(User);

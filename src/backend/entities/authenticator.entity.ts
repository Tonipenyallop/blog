import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Authenticator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  credentialID!: Uint8Array;

  @Column()
  credentialPublicKey!: Uint8Array;

  @Column()
  counter!: number;

  @Column()
  credentialDeviceType!: string;

  @Column()
  credentialBackedUp!: boolean;

  @Column({ nullable: true })
  transports?: AuthenticatorTransport[];

  @Column()
  userID!: number;
}

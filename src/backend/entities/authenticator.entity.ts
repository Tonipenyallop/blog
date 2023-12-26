import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Authenticator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bytea" })
  credentialID!: Uint8Array;

  @Column({ type: "bytea" })
  credentialPublicKey!: Uint8Array;

  @Column()
  counter!: number;

  @Column()
  credentialDeviceType!: string;

  @Column()
  credentialBackedUp!: boolean;

  @Column({ nullable: true, type: "character varying", array: true })
  transports?: AuthenticatorTransport[];

  @Column()
  userID!: number;
}

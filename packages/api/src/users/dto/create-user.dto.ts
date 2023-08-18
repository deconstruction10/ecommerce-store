import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity('users')
export class CreateUserDto {
  @PrimaryGeneratedColumn({name: 'id', type: 'number', primaryKeyConstraintName: 'id'})
  @ApiProperty({name: 'id', type: 'number'})
  id: number;

  @Column({name: 'username', type: 'number', nullable: true})
  username: string;

  @Column({name: 'email', type: 'string', nullable: true})
  email: string;

  @Column({ name: 'accessToken', type: 'string', nullable: true })
  accessToken: string;

  @Column({ name: 'refreshToken', type: 'string', nullable: true })
  refreshToken: string;

  @Column({name: 'password', type: 'string', nullable: true})
  password: string;

}

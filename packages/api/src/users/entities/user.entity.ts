import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Brands} from "../../brands/entities/brand.entity";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  password: string;

  @ManyToOne(() => Brands, brand => brand.series)
  brand: Brands;
}

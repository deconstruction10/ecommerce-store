import { EntityRepository, Repository } from 'typeorm';
import {Users} from "../entities/user.entity";

@EntityRepository()
export class UsersRepository extends Repository<Users> {}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users)
              private readonly usersRepository: Repository<Users>) {
  }
  async create(profile: Users) {
    const user = await this.usersRepository.findOne({where: {email: profile.email}});

    if (user) {
      return user;
    } else {
      const newUser = this.usersRepository.create({
        id: profile.id,
        username: profile.username,
        password: profile.password,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken
      })
      return this.usersRepository.save(newUser);
    }
  }

  async findUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({where: { email: email}});
  }

  async saveToken(id: number, accessToken: string, refreshToken: string) {
    const user= this.usersRepository.findOneById(id);

    if (user) {
      user.then(() => {

      })
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

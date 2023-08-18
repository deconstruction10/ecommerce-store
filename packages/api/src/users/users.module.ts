import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./entities/user.entity";
import {BrandsModule} from "../brands/brands.module";
import {SeriesModule} from "../series/series.module";
import {UsersRepository} from "./repository/users.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersRepository]),
    BrandsModule,
    SeriesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const ormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'products',
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};
export default ormConfig;

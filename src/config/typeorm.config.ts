import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'api_user',
  password: 'postgresdbd3v!329',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true,
};

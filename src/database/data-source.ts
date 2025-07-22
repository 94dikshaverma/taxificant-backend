import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { User } from '@/modules/users/entities/user.entity';

// Load environment variables
dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  database: configService.get<string>('DATABASE_PATH', './database.sqlite'),
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
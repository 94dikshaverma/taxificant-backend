import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { User } from '@/modules/users/entities/user.entity';

// Load environment variables
dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
  password: configService.get<string>('DATABASE_PASSWORD', ''),
  database: configService.get<string>('DATABASE_NAME', 'taxificant_dev'),
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

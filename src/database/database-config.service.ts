import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseType = this.configService.get<string>('DATABASE_TYPE', 'sqlite');

    if (databaseType === 'sqlite') {
      return {
        type: 'sqlite',
        database: this.configService.get<string>('DATABASE_PATH', './database.sqlite'),
        entities: [User],
        migrations: ['src/database/migrations/*.ts'],
        synchronize: this.configService.get<string>('NODE_ENV') === 'development',
        logging: this.configService.get<string>('NODE_ENV') === 'development',
        migrationsRun: false,
      };
    }

    // MySQL/MariaDB configuration (for production)
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      migrationsRun: false,
    };
  }
}
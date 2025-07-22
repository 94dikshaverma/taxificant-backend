import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseType = this.configService.get<string>('DATABASE_TYPE', 'postgres');

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

    // ✅ PostgreSQL configuration
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5432),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false, // Use migrations in production
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      migrationsRun: false,
      autoLoadEntities: true,
    };
  }
}

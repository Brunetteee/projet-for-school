import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config, dbConfig } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<dbConfig>('database');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [
            path.join(
              process.cwd(),
              'backend',
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'backend',
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}

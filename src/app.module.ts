import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { versionRoutes } from './version.router';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [],
            synchronize: process.env.NODE_ENV === 'development',
        }),
        RouterModule.register(versionRoutes),
        V1Module,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

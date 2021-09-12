import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { versionRoutes } from './version.router';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './shared/services/config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${ConfigService.getEnv('NODE_ENV')}`,
        }),
        TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
        RouterModule.register(versionRoutes),
        V1Module,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

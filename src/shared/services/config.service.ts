import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';

export class ConfigService {
    static getEnv(key: string): string {
        return process.env[key];
    }

    static isProduction(): boolean {
        return this.getEnv('NODE_ENV') === 'production';
    }

    static getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',

            host: this.getEnv('DB_HOST'),
            port: Number(this.getEnv('DB_PORT')),
            username: this.getEnv('DB_USER'),
            password: this.getEnv('DB_PASSWORD'),
            database: this.getEnv('DB_NAME'),
            entities: [User, Comment, Post, Tag],
            // synchronize: !ConfigService.isProduction, // TODO: Figure out this moment
            synchronize: true,
        };
    }
}

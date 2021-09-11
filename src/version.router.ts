import { Routes } from '@nestjs/core';
import { V1Module } from './v1/v1.module';
import { UserModule } from './v1/user/user.module';
import { PostModule } from './v1/post/post.module';
import { CommentModule } from './v1/comment/comment.module';
import { AuthModule } from './v1/auth/auth.module';

export const versionRoutes: Routes = [
    {
        path: '/v1',
        module: V1Module,
        children: [
            {
                path: '/users',
                module: UserModule,
            },
            {
                path: '/posts',
                module: PostModule,
            },
            {
                path: '/comments',
                module: CommentModule,
            },
            {
                path: '/auth',
                module: AuthModule,
            },
        ],
    },
];
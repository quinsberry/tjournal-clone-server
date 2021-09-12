import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [UserModule, CommentModule, AuthModule, PostModule, TagModule],
    providers: [],
})
export class V1Module {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '../../shared/repositories/post.repository';
import { TagRepository } from '../../shared/repositories/tag.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository, TagRepository])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {
}

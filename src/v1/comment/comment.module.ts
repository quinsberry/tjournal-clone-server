import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '../../shared/repositories/post.repository';
import { CommentRepository } from '../../shared/repositories/comment.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository, CommentRepository])],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService],
})
export class CommentModule {}

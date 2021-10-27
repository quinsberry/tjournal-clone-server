import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../shared/repositories/post.repository';
import { CommentRepository } from '../../shared/repositories/comment.repository';
import { SerializedResponse, SerializerService } from '../../shared/services/serializer.service';
import { Comment } from '../../shared/entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository) private readonly commentRepository: CommentRepository,
        @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    ) {}

    create(dto: CreateCommentDto) {
        return this.commentRepository.createComment(dto);
    }

    async findAll(): Promise<SerializedResponse<Comment[]>> {
        const comments = await this.commentRepository.findAll();
        return SerializerService.response(comments);
    }

    findOne(id: number) {
        return this.commentRepository.findById(id);
    }

    async update(id: number, dto: UpdateCommentDto) {
        const post = await this.postRepository.findById(dto.postId, ['comments']);
        const isCommentExist = post.comments.some((comment) => comment.id === id);
        if (!isCommentExist) {
            throw new BadRequestException(`Post with id ${post.id} has no comment with id ${id}`);
        }
        await this.commentRepository.updateComment(id, dto.text);
        return HttpStatus.NO_CONTENT;
    }

    async remove(id: number) {
        await this.commentRepository.removeById(id);
        return HttpStatus.NO_CONTENT;
    }
}

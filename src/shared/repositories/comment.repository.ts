import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../../v1/comment/dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    constructor() {
        super();
    }

    findAll() {
        return this.find({ relations: ['user'] });
    }

    createComment(dto: CreateCommentDto) {
        // TODO: Mocked user. refactor this code when auth will be implemented
        const serializedObj = {
            text: dto.text,
            post: { id: dto.postId },
            user: { id: 11 },
        };
        return this.save(serializedObj);
    }

    async updateComment(id: number, text: string) {
        const comment = await this.findById(id);
        comment.text = text;
        return await comment.save();
    }

    async findById(id: number) {
        try {
            return await this.findOneOrFail(id, { relations: ['user'] });
        } catch (e) {
            throw new NotFoundException('Comment not found');
        }
    }

    async removeById(id: number) {
        await this.findById(id);
        const { affected } = await this.delete(id);
        if (!affected) {
            throw new HttpException('Comment deletion was failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return !!affected;
    }
}

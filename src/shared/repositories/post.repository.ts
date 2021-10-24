import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../../v1/post/dto/create-post.dto';
import { UpdatePostDto } from '../../v1/post/dto/update-post.dto';
import { Tag } from '../entities/tag.entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { validateFirstElementInList } from '../utils/checkers';

export interface CorrectCreatePostDto extends Omit<CreatePostDto, 'tags'> {
    tags: Tag[];
}

export interface CorrectUpdatePostDto extends Omit<UpdatePostDto, 'tags'> {
    tags: Tag[];
}

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    constructor() {
        super();
    }

    findAll() {
        return this.find({ relations: ['tags'] });
    }

    createPost(dto: CorrectCreatePostDto) {
        return this.save(dto);
    }

    async updatePost(id: number, dto: CorrectUpdatePostDto) {
        const post = await this.findById(id);
        Object.keys(dto).forEach((key) => {
            if (key === 'tags' && !validateFirstElementInList(dto.tags, (_) => !!_)) {
                return;
            }
            post[key] = dto[key];
        });
        return await post.save();
    }

    async findById(id: number) {
        try {
            return await this.findOneOrFail(id, { relations: ['tags'] });
        } catch (e) {
            throw new NotFoundException('Post not found');
        }
    }

    async removeById(id: number) {
        await this.findById(id);
        const { affected } = await this.delete(id);
        if (!affected) {
            throw new HttpException('Post deletion was failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return !!affected;
    }
}

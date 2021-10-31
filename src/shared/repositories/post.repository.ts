import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../../v1/post/dto/create-post.dto';
import { UpdatePostDto } from '../../v1/post/dto/update-post.dto';
import { Tag } from '../entities/tag.entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { validateFirstElementInList } from '../utils/checkers';
import { User } from '../entities/user.entity';
import { SearchPostDto } from '../../v1/post/dto/search-post.dto';

export interface CorrectCreatePostDto extends Omit<CreatePostDto, 'tags'> {
    tags: Tag[];
    user: User;
}

export interface CorrectUpdatePostDto extends Omit<UpdatePostDto, 'tags'> {
    tags: Tag[];
}

type PostRelations = 'tags' | 'comments' | 'user';

enum SearchDefaults {
    Limit = 10,
    Skip = 0,
}

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    constructor() {
        super();
    }

    findAll() {
        return this.find({
            order: { createdAt: 'DESC' },
            relations: ['tags'],
        });
    }

    async findByIdWithViews(id: number) {
        const post = await this.findById(id, ['tags', 'comments', 'user']);
        post.views += 1;
        return post.save();
    }

    findPopular() {
        return this.createQueryBuilder('p')
            .leftJoinAndSelect('p.tags', 'tags')
            .orderBy('views', 'DESC')
            .limit(10)
            .getManyAndCount();
    }

    search(dto: SearchPostDto) {
        const qb = this.createQueryBuilder('p')
            .leftJoinAndSelect('p.tags', 'tags')
            .limit(dto.take ?? SearchDefaults.Limit)
            .offset(dto.skip ?? SearchDefaults.Skip);

        if (dto.views) {
            qb.orderBy('views', dto.views);
        }

        if (dto.body) {
            qb.andWhere('p.body ILIKE :body', { body: `%${dto.body}%` });
        }

        if (dto.title) {
            qb.andWhere('p.title ILIKE :title', { title: `%${dto.title}%` });
        }

        if (dto.tags) {
            if (Array.isArray(dto.tags)) {
                // TODO: It doesn't work properly. Selecting just the last tag id.
                dto.tags.map((tag) => {
                    qb.andWhere('tags.id = :tag', { tag });
                });
            } else {
                qb.andWhere('tags.id = :id', { id: dto.tags });
            }
        }

        return qb.getManyAndCount();
    }

    createPost(dto: CorrectCreatePostDto) {
        return this.save(dto);
    }

    async updatePost(id: number, dto: CorrectUpdatePostDto) {
        const post = await this.findById(id, ['tags', 'comments']);
        Object.keys(dto).forEach((key) => {
            if (key === 'tags' && !validateFirstElementInList(dto.tags, (_) => !!_)) {
                return;
            }
            post[key] = dto[key];
        });
        return await post.save();
    }

    async findById(id: number, relations?: PostRelations[]) {
        try {
            return await this.findOneOrFail(id, { relations });
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

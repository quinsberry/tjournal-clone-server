import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../shared/repositories/post.repository';
import { TagRepository } from '../../shared/repositories/tag.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
        @InjectRepository(TagRepository) private readonly tagRepository: TagRepository,
    ) {}

    async create(dto: CreatePostDto) {
        const tags = await this.tagRepository.findById(dto.tags);
        const updatedObj = { ...dto, tags: Array.isArray(tags) ? tags : [tags] };
        return this.postRepository.createPost(updatedObj);
    }

    findAll() {
        return this.postRepository.findAll();
    }

    findOne(id: number) {
        return this.postRepository.findById(id);
    }

    async update(id: number, dto: UpdatePostDto) {
        const tags = await this.tagRepository.findById(dto.tags);
        const updatedObj = { ...dto, tags: Array.isArray(tags) ? tags : [tags] };
        return this.postRepository.updatePost(id, updatedObj);
    }

    remove(id: number) {
        return this.postRepository.removeById(id);
    }
}

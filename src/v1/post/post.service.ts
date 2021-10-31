import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../shared/repositories/post.repository';
import { TagRepository } from '../../shared/repositories/tag.repository';
import { SerializedResponse, SerializerService } from '../../shared/services/serializer.service';
import { Post } from '../../shared/entities/post.entity';
import { UserRepository } from '../../shared/repositories/user.repository';
import { SearchPostDto } from './dto/search-post.dto';
import { User } from '../../shared/entities/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(TagRepository) private readonly tagRepository: TagRepository,
    ) {}

    async create(user: User, dto: CreatePostDto) {
        const tags = await this.tagRepository.findById(dto.tags);
        const updatedObj = {
            ...dto,
            tags: Array.isArray(tags) ? tags : [tags],
            user,
        };
        return this.postRepository.createPost(updatedObj);
    }

    async findAll(): Promise<SerializedResponse<Post[]>> {
        const posts = await this.postRepository.findAll();
        return SerializerService.response(posts);
    }

    async findPopular() {
        const [posts, total] = await this.postRepository.findPopular();
        return SerializerService.response({
            items: posts,
            total,
        });
    }

    async search(dto: SearchPostDto) {
        const [posts, total] = await this.postRepository.search(dto);
        return SerializerService.response({
            items: posts,
            total,
        });
    }

    findOne(id: number) {
        return this.postRepository.findByIdWithViews(id);
    }

    async update(id: number, user: User, dto: UpdatePostDto) {
        const tags = await this.tagRepository.findById(dto.tags);
        await this.userRepository.findUserByPost(user.id, id);
        const updatedObj = { ...dto, tags: Array.isArray(tags) ? tags : [tags] };
        return this.postRepository.updatePost(id, updatedObj);
    }

    async remove(id: number) {
        await this.postRepository.removeById(id);
        return HttpStatus.NO_CONTENT;
    }
}

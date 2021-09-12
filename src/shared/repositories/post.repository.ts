import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../../v1/post/dto/create-post.dto';
import { UpdatePostDto } from '../../v1/post/dto/update-post.dto';
import { Tag } from '../entities/tag.entity';

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

    updatePost(id: number, dto: CorrectUpdatePostDto) {
        return this.update(id, dto);
    }

    findById(id: number) {
        return this.findOne(id);
    }

    removeById(id: number) {
        return this.delete(id);
    }
}

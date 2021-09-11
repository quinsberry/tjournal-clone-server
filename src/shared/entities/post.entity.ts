import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('posts')
export class Post extends BaseEntity {
    constructor(post: Partial<Post>) {
        super();
        Object.assign(this, post);
    }
}

import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('posts')
export class Post extends BaseEntity {
    constructor(post: Partial<Post>) {
        super();
        Object.assign(this, post);
    }

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ default: 0 })
    views: number;

    @Column({ nullable: true })
    tags: string;
}

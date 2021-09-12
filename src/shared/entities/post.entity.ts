import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

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

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @ManyToMany(() => Tag, (tag) => tag.posts)
    tags: Tag[];
}

import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

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

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @ManyToMany(() => Tag, (tag) => tag.posts, { onDelete: 'CASCADE' })
    tags: Tag[];
}

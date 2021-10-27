import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment extends BaseEntity {
    constructor(comment: Partial<Comment>) {
        super();
        Object.assign(this, comment);
    }

    @Column()
    text: string;

    @ManyToOne(() => User, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Post, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    post: Post;
}

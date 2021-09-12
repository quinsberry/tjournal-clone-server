import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity('tags')
export class Tag extends BaseEntity {
    constructor(tag: Partial<Tag>) {
        super();
        Object.assign(this, tag);
    }

    @Column()
    title: string;

    @Column({ unique: true })
    value: string;

    @ManyToMany(() => Post, (post) => post.tags, { cascade: true })
    @JoinTable({
        name: 'tag_posts',
        joinColumn: {
            name: 'tag',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'post',
            referencedColumnName: 'id',
        },
    })
    posts: Post[];
}

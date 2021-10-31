import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true, default: null })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @Column({ default: false })
    activated: boolean;

    // @Exclude()
    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6);
    }

    comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

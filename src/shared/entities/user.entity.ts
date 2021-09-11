import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';

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

    @Column({ default: false })
    activated: boolean;

    @Exclude()
    @Column()
    password: string;
}

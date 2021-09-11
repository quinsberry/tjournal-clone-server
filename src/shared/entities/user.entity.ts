import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }
}

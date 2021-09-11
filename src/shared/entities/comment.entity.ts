import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
    constructor(comment: Partial<Comment>) {
        super();
        Object.assign(this, comment);
    }
}

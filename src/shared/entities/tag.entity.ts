import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tags')
export class Tag extends BaseEntity {
    constructor(tag: Partial<Tag>) {
        super();
        Object.assign(this, tag);
    }

    @Column()
    title: string;

    @Column()
    value: string;
}

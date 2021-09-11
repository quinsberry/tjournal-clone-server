import { BaseEntity as TypeOrmBaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

export abstract class BaseEntity extends TypeOrmBaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    toJSON() {
        return classToPlain(this);
    }
}

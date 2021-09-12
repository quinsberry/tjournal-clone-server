import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../v1/user/dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor() {
        super();
    }

    findAll() {
        return this.find();
    }

    createUser(dto: CreateUserDto) {
        return this.save(dto);
    }
}

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}

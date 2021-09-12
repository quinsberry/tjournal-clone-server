import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseException } from '../../shared/exceptions/base.exception';

@Controller()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTagDto, @Res() res: Response) {
        const response = await this.tagService.update(+id, dto);
        if (response.affected === 0) {
            BaseException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Tag has not been found',
            });
        }
        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}

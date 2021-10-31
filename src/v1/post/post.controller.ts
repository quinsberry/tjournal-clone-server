import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createPostDto: CreatePostDto) {
        return this.postService.create(req.user, createPostDto);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get('popular')
    getPopular() {
        return this.postService.findPopular();
    }

    @Get('search')
    searchPosts(@Query() dto: SearchPostDto) {
        return this.postService.search(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, req.user, updatePostDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.postService.remove(+id);
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrPostsService } from './ziresefr-posts.service';
import { CreateZiresefrPostDto } from './dto/create-ziresefr-post.dto';
import { UpdateZiresefrPostDto } from './dto/update-ziresefr-post.dto';

@Controller('ziresefr-posts')
export class ZiresefrPostsController {
  constructor(private readonly ziresefrPostsService: ZiresefrPostsService) {}

  @Post()
  create(@Body() createZiresefrPostDto: CreateZiresefrPostDto) {
    return this.ziresefrPostsService.create(createZiresefrPostDto);
  }

  @Get()
  findAll() {
    return this.ziresefrPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ziresefrPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZiresefrPostDto: UpdateZiresefrPostDto) {
    return this.ziresefrPostsService.update(+id, updateZiresefrPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ziresefrPostsService.remove(+id);
  }
}

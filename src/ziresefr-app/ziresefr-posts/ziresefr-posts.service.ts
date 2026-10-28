import { Injectable } from '@nestjs/common';
import { CreateZiresefrPostDto } from './dto/create-ziresefr-post.dto';
import { UpdateZiresefrPostDto } from './dto/update-ziresefr-post.dto';

@Injectable()
export class ZiresefrPostsService {
  create(createZiresefrPostDto: CreateZiresefrPostDto) {
    return 'This action adds a new ziresefrPost';
  }

  findAll() {
    return `This action returns all ziresefrPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ziresefrPost`;
  }

  update(id: number, updateZiresefrPostDto: UpdateZiresefrPostDto) {
    return `This action updates a #${id} ziresefrPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} ziresefrPost`;
  }
}

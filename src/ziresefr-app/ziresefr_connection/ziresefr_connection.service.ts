import { Injectable } from '@nestjs/common';
import { CreateZiresefrConnectionDto } from './dto/create-ziresefr_connection.dto';
import { UpdateZiresefrConnectionDto } from './dto/update-ziresefr_connection.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ZiresefrConnectionService {
  constructor(private configService: ConfigService) {
    const wp_usernam = this.configService.getOrThrow<string>('WP_USERNAME');
    const wp_app_pass = this.configService.getOrThrow<string>('WP_APP_PASSWORD');

  }

  create(createZiresefrConnectionDto: CreateZiresefrConnectionDto) {
    return 'This action adds a new ziresefrConnection';
  }

  findAll() {
    return `This action returns all ziresefrConnection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ziresefrConnection`;
  }

  update(id: number, updateZiresefrConnectionDto: UpdateZiresefrConnectionDto) {
    return `This action updates a #${id} ziresefrConnection`;
  }

  remove(id: number) {
    return `This action removes a #${id} ziresefrConnection`;
  }
}

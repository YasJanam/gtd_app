import { Module } from '@nestjs/common';
import { ZiresefrConnectionService } from './ziresefr_connection.service';
import { ZiresefrConnectionController } from './ziresefr_connection.controller';
import { WpusersController } from './wpusers-controller/wpusers.controller';

@Module({
  controllers: [
    ZiresefrConnectionController,
    WpusersController,
  ],
  providers: [ZiresefrConnectionService],
})

export class ZiresefrConnectionModule {}

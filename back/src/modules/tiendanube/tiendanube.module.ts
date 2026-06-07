import { Module } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { TiendanubeController } from './tiendanube.controller';

@Module({
  controllers: [TiendanubeController],
  providers: [TiendanubeService],
  exports: [TiendanubeService], // ¡Fundamental para poder usarlo en otros módulos!
})
export class TiendanubeModule {}
import { Module } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { TiendanubeController } from './tiendanube.controller';
import { AbandonedCartRepository } from '../abandonedCart/abandonedCart.repository';
import { OrderLocationRepository } from '../orderLocation/orderLocation.repository';

@Module({
  controllers: [TiendanubeController],
  providers: [TiendanubeService,
              AbandonedCartRepository,
              OrderLocationRepository
            ],
  exports: [TiendanubeService],
})
export class TiendanubeModule {}
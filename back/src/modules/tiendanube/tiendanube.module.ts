import { Module } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { TiendanubeController } from './tiendanube.controller';
import { AbandonedCartRepository } from '../abandonedCart/abandonedCart.repository';

@Module({
  controllers: [TiendanubeController],
  providers: [TiendanubeService,
              AbandonedCartRepository,
            ],
  exports: [TiendanubeService],
})
export class TiendanubeModule {}
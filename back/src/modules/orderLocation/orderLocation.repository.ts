// src/modules/tiendanube/order-location.repository.ts
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { OrderLocation } from '../../infrastructure/database/entities/OrderLocation';
import { BaseMikroOrmRepository } from '../../shared/base/base.repository';

@Injectable()
export class OrderLocationRepository extends BaseMikroOrmRepository<OrderLocation> {
  constructor(em: EntityManager) {
    super(em, OrderLocation);
  }
}
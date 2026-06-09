import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { AbandonedCart } from '../../infrastructure/database/entities/AbandonedCart';
import { BaseMikroOrmRepository } from '../../shared/base/base.repository';

@Injectable()
export class AbandonedCartRepository extends BaseMikroOrmRepository<AbandonedCart> {
  constructor(em: EntityManager) {
    super(em, AbandonedCart);
  }

}
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from "@nestjs/common";
import { Armchair } from '../../infrastructure/database/entities/Armchair';
import { BaseMikroOrmRepository } from "../../shared/base/base.repository";
@Injectable()
export class ArmchairRepository extends BaseMikroOrmRepository<Armchair> {

  constructor(em: EntityManager) {
    super(em, Armchair);
  }

}
import {type Opt} from '@mikro-orm/core';
import { Entity, Property, PrimaryKey} from '@mikro-orm/decorators/legacy';
import { CustomBaseEntity } from './BaseEntity';


@Entity()
export class Armchair extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @Property({ type: 'string', fieldName: 'name', nullable: false, length: 50 })
  name!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number;

  @Property({ type: 'integer' })
  baseWidthCm!: number;

  @Property({ type: 'integer' })
  baseDepthCm!: number;

  @Property({ type: 'integer' })
  baseHeightCm!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  extraWidthCmPrice!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  extraDepthCmPrice!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  extraHeightCmPrice!: number;

}
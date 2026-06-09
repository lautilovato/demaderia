// src/infrastructure/database/entities/OrderLocation.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { CustomBaseEntity } from './BaseEntity';
@Entity()
export class OrderLocation extends CustomBaseEntity {
  @PrimaryKey({ type: 'string', fieldName: 'order_id', nullable: false, length: 255 })
  orderId!: string;

  @Property({ type: 'string', fieldName: 'postal_code', nullable: false, length: 20 })
  postalCode!: string;

  @Property({ type: 'string', fieldName: 'city', nullable: true, length: 100 })
  city?: string;

  @Property({ type: 'string', fieldName: 'province', nullable: true, length: 100 })
  province?: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  totalValue!: number;
}
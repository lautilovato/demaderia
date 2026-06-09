// src/infrastructure/database/entities/AbandonedCart.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { CustomBaseEntity } from './BaseEntity';

@Entity()
export class AbandonedCart extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer' })
  checkoutId!: string;

  @Property({ type: 'string', fieldName: 'customer_email', nullable: false, length: 255 })
  customerEmail!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice!: number;

  @Property({ type: 'text' })
  recoveryUrl!: string;

  @Property({ type: 'string', fieldName: 'status', nullable: false, length: 50 })
  status: string = 'abandoned';
}
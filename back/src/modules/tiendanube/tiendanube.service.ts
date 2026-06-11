import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import axios, { AxiosInstance } from 'axios';
import { AbandonedCart } from '../../infrastructure/database/entities/AbandonedCart'; 
import { AbandonedCartRepository } from '../abandonedCart/abandonedCart.repository';
import { TiendanubeProductDto } from './dto/product.dto';
import { OrderLocationRepository } from '../orderLocation/orderLocation.repository';
@Injectable()
export class TiendanubeService {
  private readonly logger = new Logger(TiendanubeService.name);
  private readonly client: AxiosInstance;
  private readonly storeId;

  constructor(
    private configService: ConfigService,
    public readonly abandonedCartRepository: AbandonedCartRepository,
    private readonly orderLocationRepository: OrderLocationRepository,
  ) {
    this.storeId = this.configService.get<string>('TIENDANUBE_STORE_ID');
    const accessToken = this.configService.get<string>('TIENDANUBE_ACCESS_TOKEN');
    const userAgent = this.configService.get<string>('TIENDANUBE_USER_AGENT');

    // Pre-configuramos Axios con los headers obligatorios
    this.client = axios.create({
      baseURL: `https://api.tiendanube.com/v1/${this.storeId}`,
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts(): Promise<TiendanubeProductDto[]> {
    try {
      const response = await this.client.get('/products');
      const products = response.data;

      return products.map((product: any) => {
        const firstVariant = product.variants?.[0];
        const firstImage = product.images?.[0];

        let stockValue: number | null;
        if (firstVariant && firstVariant.stock_management && firstVariant.stock !== null) {
          stockValue = Number(firstVariant.stock);
        } else if (product.has_stock) {
          stockValue = null; // Disponible, pero sin seguimiento de cantidad
        } else {
          stockValue = 0; // Sin stock
        }

        return {
          id: product.id,
          name: product.name?.es || 'Sin nombre',
          description: product.description?.es || '',
          price: firstVariant ? parseFloat(firstVariant.price) : 0,
          stock: stockValue,
          sku: firstVariant?.sku || null,
          imageUrl: firstImage?.src || null,
          url: product.canonical_url,
        };
      });
    } catch (error) {
      this.logger.error('Error al obtener productos de Tiendanube', error);
      throw error;
    }
  }

  async processAbandonedCart(payload: any) {
    try {
      const checkoutId = payload.id.toString();
      const email = payload.customer?.email || 'sin-email@desconocido.com';
      const total = parseFloat(payload.total);
      const recoveryUrl = payload.abandoned_checkout_url;

      let cart = await this.abandonedCartRepository.findOne({ checkoutId });

      if (!cart) {
        cart = this.abandonedCartRepository.create({
          checkoutId,
          customerEmail: email,
          totalPrice: total,
          recoveryUrl,
          status: 'abandoned',
        });
        await this.abandonedCartRepository.save(cart);
        
        this.logger.log(`Nuevo carrito abandonado guardado para: ${email}`);
      } else {
        cart.totalPrice = total;
        cart.recoveryUrl = recoveryUrl;
        await this.abandonedCartRepository.save(cart);
        
        this.logger.log(`Carrito abandonado actualizado para: ${email}`);
      }
    } catch (error) {
      this.logger.error(`Error al procesar carrito abandonado (ID: ${payload?.id})`, error);
      throw error;
    }
  }


  async processCompletedOrder(payload: any) {
  try {
    const shipping = payload.shipping_address;
    if (!shipping || !shipping.zipcode) {
      this.logger.log(`Orden ${payload.id} no tiene código postal registrado.`);
      return;
    }

    const orderId = payload.id.toString();
    
    const existingRecord = await this.orderLocationRepository.findOne({ orderId });
    if (existingRecord) return;

    const locationData = this.orderLocationRepository.create({
      orderId,
      postalCode: shipping.zipcode,
      city: shipping.city,
      province: shipping.province,
      totalValue: parseFloat(payload.total),
    });

    await this.orderLocationRepository.save(locationData);
    this.logger.log(`Nueva zona de venta registrada: CP ${shipping.zipcode} (${shipping.city})`);

  } catch (error) {
    this.logger.error(`Error al procesar ubicación de orden (ID: ${payload?.id})`, error);
    throw error;
  }
}
  
}
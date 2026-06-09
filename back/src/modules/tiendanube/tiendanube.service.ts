import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import axios, { AxiosInstance } from 'axios';
import { AbandonedCart } from '../../infrastructure/database/entities/AbandonedCart'; 
import { AbandonedCartRepository } from '../abandonedCart/abandonedCart.repository';
@Injectable()
export class TiendanubeService {
  private readonly logger = new Logger(TiendanubeService.name);
  private readonly client: AxiosInstance;
  private readonly storeId;

  constructor(
    private configService: ConfigService,
    private readonly abandonedCartRepository: AbandonedCartRepository,
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

  async getProducts() {
    try {
      const response = await this.client.get('/products');
      return response.data;
    } catch (error) {
      this.logger.error('Error al obtener productos de Tiendanube', error);
      throw error;
    }
  }

  // === LÓGICA DE WEBHOOKS: CARRITOS ABANDONADOS ===
  async processAbandonedCart(payload: any) {
    try {
      // 1. Extraemos los datos del JSON que envía Tiendanube
      const checkoutId = payload.id.toString();
      const email = payload.customer?.email || 'sin-email@desconocido.com';
      const total = parseFloat(payload.total);
      const recoveryUrl = payload.abandoned_checkout_url;

      // 2. Buscamos si ya existe para evitar duplicados
      let cart = await this.abandonedCartRepository.findOne({ checkoutId });

      if (!cart) {
        // 3. Si no existe, creamos el registro
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
        // 4. Si ya existe, actualizamos los datos (ej: si agregó más cosas antes de irse)
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
}
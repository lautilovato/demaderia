import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TiendanubeService {
  private readonly logger = new Logger(TiendanubeService.name);
  private readonly client: AxiosInstance;
  private readonly storeId;

  constructor(private configService: ConfigService) {
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

  // agregar más métodos acá (createProduct, updateStock, etc.)
}
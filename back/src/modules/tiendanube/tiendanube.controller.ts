import { Controller, Get, HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';

@Controller('tiendanube')
export class TiendanubeController {
  constructor(private readonly tiendanubeService: TiendanubeService) {}

  @Get('products')
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    try {
      const products = await this.tiendanubeService.getProducts();
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'No se pudieron recuperar los productos de Tiendanube',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
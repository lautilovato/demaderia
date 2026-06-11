import { Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { Body } from '@nestjs/common';

@Controller('tiendanube')
export class TiendanubeController {
  constructor(private readonly tiendanubeService: TiendanubeService) {}

  @Get('products')
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    try {
      const products = await this.tiendanubeService.getProducts();
      return {
        products
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'No se pudieron recuperar los productos de Tiendanube',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  @Post('webhook/checkouts')
  @HttpCode(HttpStatus.OK)
  async handleAbandonedCartWebhook(@Body() payload: any) {
    
    this.tiendanubeService.processAbandonedCart(payload).catch((err) => {
        console.error('Error procesando el webhook en segundo plano:', err);
    });
    
    return { received: true }; 
  }

  @Post('webhook/orders/paid')
  @HttpCode(HttpStatus.OK)
  async handlePaidOrderWebhook(@Body() payload: any) {
    this.tiendanubeService.processCompletedOrder(payload).catch((err) => {
        console.error('Error procesando ubicación de la orden:', err);
    });
    return { received: true }; 
  }

  @Get('webhook/orders/abandoned')
  @HttpCode(HttpStatus.OK)
  async testFetchAbandonedCarts() {
  return this.tiendanubeService.abandonedCartRepository.findAll()  
  }
}
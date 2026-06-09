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

  @Post('webhook/checkouts')
  @HttpCode(HttpStatus.OK) // Devolvemos 200 OK rápido para que Tiendanube no reintente
  async handleAbandonedCartWebhook(@Body() payload: any) {
    
    // Delegamos la lógica al servicio en segundo plano (fire and forget)
    // Usamos .catch() para que si falla la base de datos, no le devuelva un error 500 a Tiendanube
    this.tiendanubeService.processAbandonedCart(payload).catch((err) => {
        console.error('Error procesando el webhook en segundo plano:', err);
    });
    
    // Le respondemos a Tiendanube inmediatamente que recibimos el paquete
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
}
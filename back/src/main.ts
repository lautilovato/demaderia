import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 2. Ejecutar migraciones automáticamente antes de escuchar peticiones
  const orm = app.get(MikroORM);
  await orm.migrator.up();

  // 3. Obtener el puerto desde las variables de entorno (o usar 3000 por defecto)
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Servidor corriendo en el puerto ${port}`);
}
bootstrap();

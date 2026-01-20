import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/aplication/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      }),
    );

  app.useGlobalGuards(app.get(JwtAuthGuard));
  
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();

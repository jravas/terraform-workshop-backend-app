import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription(
      'The Backend API documentation presents detailed documentation on the RESTful endpoints.\n\nLink to OpenAPI specification: [openApi](/docs-json)',
    )
    .setVersion('1');

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup(`docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      jsonDocumentUrl: '/docs-json',
    },
  });
  
  const configService = app.get(ConfigService);

  await app.listen(configService.get('API_PORT'));
}
bootstrap();

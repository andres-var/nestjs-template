import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },

      exceptionFactory: (errors) => {
        const errorMessages = errors?.map((error) => ({
          [error.property]: Object.values(error.constraints),
        }));

        return new BadRequestException(errorMessages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.NAME_PROJECT)
    .setDescription(`${process.env.NAME_PROJECT} endpoints`)
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addBearerAuth({
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(+process.env.PORT);

  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();

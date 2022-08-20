import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

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
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, AuthModule],
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(+process.env.PORT);

  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();

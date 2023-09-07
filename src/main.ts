import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Проект обучение Продвинутый BACKEND')
    .setDescription('Документация по проекту')
    .setVersion('0.0.1')
    .addTag('VelemirChernov')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();

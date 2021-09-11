import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT ?? null;
    if (!PORT) throw new Error('The PORT variable cannot be null');

    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
    const PORT = process.env.PORT ?? null;
    if (!PORT) throw new Error('The PORT variable cannot be null');

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
}

bootstrap();

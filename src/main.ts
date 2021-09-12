import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ConfigService } from './shared/services/config.service';

async function bootstrap() {
    const PORT = ConfigService.getEnv('PORT') ?? null;
    if (!PORT) throw new Error('The PORT variable cannot be null');

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
}

bootstrap();

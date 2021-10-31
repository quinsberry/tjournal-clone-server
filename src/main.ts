import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ConfigService } from './shared/services/config.service';

async function bootstrap() {
    const PORT = ConfigService.getEnv('PORT') ?? null;
    if (!PORT) throw new Error('The PORT variable cannot be null');

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [/^(.*)/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
}

bootstrap();

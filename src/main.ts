import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppConfig } from './main.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    applyAppConfig(app);

    await app.listen('3000', () => {
        console.log(`Server running on port 3000`);
    });
}

bootstrap();

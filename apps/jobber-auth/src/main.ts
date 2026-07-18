import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { setupApp } from '@jobber/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, 'proto', 'auth.proto'),
    },
  });
  await app.startAllMicroservices();
}

bootstrap();

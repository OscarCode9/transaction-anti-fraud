import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';


@Module({
  imports: [ClientsModule.register([
    {
      name: 'any_name_i_want',
      transport: Transport.KAFKA,
      options: {
        subscribe: {
          fromBeginning: true,
        },
        client: {
          clientId: 'transactions',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'transactions-validate-consumer',
        },
      },
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

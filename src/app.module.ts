import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { OracleModule } from './modules/oracle/oracle.module';

@Module({
  imports: [ClientsModule, OrdersModule, ProductsModule, OracleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

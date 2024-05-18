import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderData } from './dto/order-data.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('find')
  async find(@Query('search') search: string) {
    return await this.ordersService.find(search);
  }

  @Post('create')
  async create(@Body() dto: OrderData) {
    return await this.ordersService.create(dto);
  }

  @Post('update')
  async update(@Query('order_id', ParseIntPipe) cust_id, @Body() dto: OrderData) {
    return await this.ordersService.update(cust_id, dto);
  }

  @Post('delete')
  async delete(@Query('order_id', ParseIntPipe) cust_id) {
    return await this.ordersService.delete(cust_id);
  }

  @Get('count')
  async count() {
    return await this.ordersService.count();
  }

}

import { Body, Controller, Get, ParseIntPipe, Post, Query, Search } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CustomerData } from './dto/customer-data.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('find')
  async find(@Query('search') search: string) {
    return await this.clientsService.find(search);
  }

  @Post('create')
  async create(@Body() dto: CustomerData) {
    return await this.clientsService.create(dto);
  }

  @Post('update')
  async update(@Query('cust_id', ParseIntPipe) cust_id, @Body() dto: CustomerData) {
    return await this.clientsService.update(cust_id, dto);
  }

  @Post('delete')
  async delete(@Query('cust_id', ParseIntPipe) cust_id) {
    return await this.clientsService.delete(cust_id);
  }

  @Get('count')
  async count() {
    return await this.clientsService.count();
  }
  
}

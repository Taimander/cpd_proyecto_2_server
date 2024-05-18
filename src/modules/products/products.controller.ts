import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductData } from './dto/product-data.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('find')
  async find(@Query('search') search: string) {
    return await this.productsService.find(search);
  }

  @Post('create')
  async create(@Body() dto: ProductData) {
    return await this.productsService.create(dto);
  }

  @Post('update')
  async update(@Query('prod_id', ParseIntPipe) cust_id, @Body() dto: ProductData) {
    return await this.productsService.update(cust_id, dto);
  }

  @Post('delete')
  async delete(@Query('prod_id', ParseIntPipe) cust_id) {
    return await this.productsService.delete(cust_id);
  }

  @Get('count')
  async count() {
    return await this.productsService.count();
  }

}

import { Injectable } from '@nestjs/common';
import { ProductData } from './dto/product-data.dto';

@Injectable()
export class ProductsService {

    async find(search: string) : Promise<ProductData[]> {
        let products: ProductData[] = [
            {
              product_id: 1,
              product_name: 'Product 1',
              product_description: 'Description 1',
              category_id: 1,
              weight_class: 1,
              warranty_period: '1 year',
              supplier_id: 1,
              product_status: 'Active',
              list_price: 10,
              min_price: 5,
              catalog_url: 'http://example.com/catalog1'
            },
            {
              product_id: 2,
              product_name: 'Product 2',
              product_description: 'Description 2',
              category_id: 2,
              weight_class: 2,
              warranty_period: '2 years',
              supplier_id: 2,
              product_status: 'Inactive',
              list_price: 20,
              min_price: 10,
              catalog_url: 'http://example.com/catalog2'
            }
          ];
        return products;
    }

    async create(dto: ProductData) {
        console.log(dto);
        return {
            message: 'Cliente creado con éxito!',
            should_reload: true
        };
    }

    async update(cust_id: string, dto: ProductData) {
        console.log(cust_id);
        console.log(dto);
        return {
            message: 'Producto actualizado con éxito!',
            should_reload: true
        };
    }

    async delete(cust_id: string) {
        console.log(cust_id);
        return {
            message: 'Producto eliminado con éxito!',
            should_reload: true
        };
    }

    async count() {
        return {
            count: 10
        };
    }

}

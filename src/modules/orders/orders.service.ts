import { Injectable } from '@nestjs/common';
import { OrderData } from './dto/order-data.dto';

@Injectable()
export class OrdersService {

    async find(search: string) : Promise<OrderData[]> {
        let orders: OrderData[] = [
            {
              order_id: 1,
              order_date: '2021-01-01',
              order_mode: 'Online',
              customer_id: 1,
              order_status: 'Shipped',
              order_total: 100,
              sales_rep_id: 1,
              promotion_id: 1,
              customer_name: 'John Doe',
              items: [
                {
                  order_id: 1,
                  line_item_id: 1,
                  product_id: 1,
                  unit_price: 10,
                  quantity: 1,
                  product_name: 'Product 1'
                },
                {
                  order_id: 1,
                  line_item_id: 2,
                  product_id: 2,
                  unit_price: 20,
                  quantity: 2,
                  product_name: 'Product 2'
                }
              ]
            },
            {
              order_id: 2,
              order_date: '2021-01-02',
              order_mode: 'Online',
              customer_id: 2,
              order_status: 'Shipped',
              order_total: 200,
              sales_rep_id: 2,
              promotion_id: 2,
              customer_name: 'Jane Doe',
              items: [
                {
                  order_id: 2,
                  line_item_id: 1,
                  product_id: 1,
                  unit_price: 10,
                  quantity: 1,
                  product_name: 'Product 1'
                },
                {
                  order_id: 2,
                  line_item_id: 2,
                  product_id: 2,
                  unit_price: 20,
                  quantity: 2,
                  product_name: 'Product 2'
                }
              ]
            },
            {
              order_id: 3,
              order_date: '2021-01-03',
              order_mode: 'Online',
              customer_id: 3,
              order_status: 'Shipped',
              order_total: 300,
              sales_rep_id: 3,
              promotion_id: 3,
              customer_name: 'Jim Doe',
              items: [
                {
                  order_id: 3,
                  line_item_id: 1,
                  product_id: 1,
                  unit_price: 10,
                  quantity: 1,
                  product_name: 'Product 1'
                },
                {
                  order_id: 3,
                  line_item_id: 2,
                  product_id: 2,
                  unit_price: 20,
                  quantity: 2,
                  product_name: 'Product 2'
                }
              ]
            }
          ];
        return orders;
    }

    async create(dto: OrderData) {
        console.log(dto);
        return {
            message: 'Orden creada con éxito!',
            should_reload: true
        };
    }

    async update(cust_id: string, dto: OrderData) {
        console.log(cust_id);
        console.log(dto);
        return {
            message: 'Orden actualizada con éxito!',
            should_reload: true
        };
    }

    async delete(cust_id: string) {
        console.log(cust_id);
        return {
            message: 'Orden eliminada con éxito!',
            should_reload: true
        };
    }

    async count() {
        return {
            count: 10
        };
    }

}

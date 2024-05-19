import { Injectable } from '@nestjs/common';
import { OrderData } from './dto/order-data.dto';
import { OracleService } from '../oracle/oracle.service';

@Injectable()
export class OrdersService {

  constructor(private oracle: OracleService) {}

    async find(search: string) : Promise<OrderData[]> {
        // 
        let orders = this.oracle.find_orders(search??'');
        return orders;
    }

    async create(dto: OrderData) {
        console.log(dto);
        dto.order_total = dto.items.reduce((acc, item) => acc + item.unit_price*item.quantity, 0);
        let res = await this.oracle.create_order(dto);
        if(res.success) {
            return {
                message: 'Orden creada con éxito!',
                should_reload: true
            };
        }else {
            return {
                message: 'Error al crear la orden. Verifique los datos.',
                should_reload: false
            };
        }
    }

    async update(order_id: number, dto: OrderData) {
        console.log(order_id);
        console.log(dto);
        dto.order_total = dto.items.reduce((acc, item) => acc + item.unit_price*item.quantity, 0);
        let res = await this.oracle.update_order(order_id, dto);
        if(res.success) {
            return {
                message: 'Orden actualizada con éxito!',
                should_reload: true
            };
        }else {
            return {
                message: 'Error al actualizar la orden. Verifique los datos.',
                should_reload: false
            };
        }
    }

    async delete(order_id: number) {
        let res = await this.oracle.delete_order(order_id);
        if(res.success) {
            return {
                message: 'Orden eliminada con éxito!',
                should_reload: true
            };
        }else {
            return {
                message: 'Error al eliminar la orden. Verifique los datos.',
                should_reload: false
            };
        }
    }

    async count() {
        return {
            count: await this.oracle.count_orders()
        };
    }

}

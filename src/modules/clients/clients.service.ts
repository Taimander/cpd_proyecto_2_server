import { Injectable } from '@nestjs/common';
import { CustomerData } from './dto/customer-data.dto';
import { OracleService } from '../oracle/oracle.service';

@Injectable()
export class ClientsService {

    constructor(
        private oracle: OracleService
    ) {}

    async find(search: string) : Promise<CustomerData[]> {
        let customers = await this.oracle.find_customers(search??'');
        return customers;
    }

    async create(dto: CustomerData) {
        let result = await this.oracle.insert_customer(dto);
        if(result.success) {
            return {
                message: 'Cliente creado con éxito!',
                should_reload: true
            };
        }
        if(result.error == 20001) {
            return {
                message: 'Región inválida.',
                should_reload: false
            };
        }
        return {
            message: 'No se puede crear. Verifique los datos.',
            should_reload: false
        };
    }

    async update(cust_id: number, dto: CustomerData) {
        let result = await this.oracle.update_customer(cust_id, dto);
        if(result.success) {
            return {
                message: 'Cliente actualizado con éxito!',
                should_reload: true
            };
        }
        return {
            message: 'No se puede actualizar. Verifique los datos.',
            should_reload: false
        };
    }

    async delete(cust_id: number) {
        let result = await this.oracle.delete_customer(cust_id);
        if(result.success) {
            return {
                message: 'Cliente eliminado con éxito!',
                should_reload: true
            };
        }
        return {
            message: 'No se puede eliminar. Verifique los datos.',
            should_reload: false
        };
    }

    async count() {
        return {
            count: await this.oracle.count_customers()
        };
    }

}

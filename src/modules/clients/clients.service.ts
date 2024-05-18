import { Injectable } from '@nestjs/common';
import { CustomerData } from './dto/customer-data.dto';

@Injectable()
export class ClientsService {

    async find(search: string) : Promise<CustomerData[]> {
        let customers: CustomerData[] = [
            {
              customer_id: 1,
              cust_first_name: 'Johna',
              cust_last_name: 'Doe',
              credit_limit: 1000,
              cust_email: 'john@gmail.com',
              income_level: 'High',
              region: 'A'
            },
            {
              customer_id: 1,
              cust_first_name: 'John',
              cust_last_name: 'Doe',
              credit_limit: 1000,
              cust_email: 'john@gmail.com',
              income_level: 'High',
              region: 'A'
            },
            {
              customer_id: 1,
              cust_first_name: 'John',
              cust_last_name: 'Doe',
              credit_limit: 1000,
              cust_email: 'john@gmail.com',
              income_level: 'High',
              region: 'A'
            },
            {
              customer_id: 1,
              cust_first_name: 'John',
              cust_last_name: 'Doe',
              credit_limit: 1000,
              cust_email: 'john@gmail.com',
              income_level: 'High',
              region: 'A'
            }
          ];
        return customers;
    }

    async create(dto: CustomerData) {
        console.log(dto);
        return {
            message: 'Cliente creado con éxito!',
            should_reload: true
        };
    }

    async update(cust_id: string, dto: CustomerData) {
        console.log(cust_id);
        console.log(dto);
        return {
            message: 'Cliente actualizado con éxito!',
            should_reload: true
        };
    }

    async delete(cust_id: string) {
        console.log(cust_id);
        return {
            message: 'Cliente eliminado con éxito!',
            should_reload: true
        };
    }

    async count() {
        return {
            count: 10
        };
    }

}

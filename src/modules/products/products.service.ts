import { Injectable } from '@nestjs/common';
import { ProductData } from './dto/product-data.dto';
import { OracleService } from '../oracle/oracle.service';

@Injectable()
export class ProductsService {

    constructor(private oracle: OracleService) {}

    async find(search: string) : Promise<ProductData[]> {
        let products: ProductData[] = await this.oracle.find_products(search??'');
        return products;
    }

    async create(dto: ProductData) {
        let result = await this.oracle.insert_product(dto);
        if(result.success) {
            return {
                message: 'Producto creado con éxito!',
                should_reload: true
            };
        }
        return {
            message: 'Error al crear el producto. Verifique los datos.',
            should_reload: false
        };
    }

    async update(prod_id: number, dto: ProductData) {
        let result = await this.oracle.update_product(prod_id, dto);
        if(result.success) {
            return {
                message: 'Producto actualizado con éxito!',
                should_reload: true
            };
        }
        return {
            message: 'Error al actualizar el producto. Verifique los datos.',
            should_reload: false
        };
    }

    async delete(prod_id: number) {
        let result = await this.oracle.delete_product(prod_id);
        if(result.success) {
            return {
                message: 'Producto eliminado con éxito!',
                should_reload: true
            };
        }
        return {
            message: 'Error al eliminar el producto. Verifique los datos.',
            should_reload: false
        };
    }

    async count() {
        return {
            count: await this.oracle.count_products()
        };
    }

}

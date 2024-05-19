import { Injectable } from '@nestjs/common';
import { BIND_OUT, CURSOR, Connection, NUMBER, getConnection } from 'oracledb';
import { CustomerData } from 'src/modules/clients/dto/customer-data.dto';
import { OrderData } from 'src/modules/orders/dto/order-data.dto';
import { ProductData } from 'src/modules/products/dto/product-data.dto';

@Injectable()
export class OracleService {

    private connection: Connection;

    constructor() {
        this.init();
    }

    private async init() {
        this.connection = await getConnection({
            user: 'USR1',
            password: 'abcd',
            connectionString: '192.168.0.10:1521/FREE'
        });
        console.log("Connected to Oracle DB");
    }

    async find_customers(search: string) {
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := buscar_clientes(:search);
            END;
            `,
            {
                search: search,
                ret: { dir: BIND_OUT, type: CURSOR }
            }
        );
        let resultSet = result.outBinds['ret'];
        let rows = [];
        while (true) {
            let row = await resultSet.getRow();
            if (!row) {
                break;
            }
            rows.push(row);
        }
        await resultSet.close();

        let customers: CustomerData[] = rows.map(row => {
            return {
                customer_id: row[0],
                cust_first_name: row[1],
                cust_last_name: row[2],
                credit_limit: row[3],
                cust_email: row[4],
                income_level: row[5],
                region: row[6]
            }
        });

        return customers;
    }

    async find_orders(search: string) {
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := buscar_ordenes(:search);
            END;
            `,
            {
                search: search,
                ret: { dir: BIND_OUT, type: CURSOR }
            }
        );
        let resultSet = result.outBinds['ret'];
        let rows = [];
        while (true) {
            let row = await resultSet.getRow();
            if (!row) {
                break;
            }
            rows.push(row);
        }
        await resultSet.close();
        const result2 = await this.connection.execute(
            `
            BEGIN
                :ret := buscar_ordenes_items(:search);
            END;
            `,
            {
                search: search,
                ret: { dir: BIND_OUT, type: CURSOR }
            }
        );
        let resultSet2 = result2.outBinds['ret'];
        let rows2 = [];
        while (true) {
            let row = await resultSet2.getRow();
            if (!row) {
                break;
            }
            rows2.push(row);
        }
        await resultSet2.close();
        let orders: OrderData[] = rows.map(row => {
            return {
                order_id: row[1],
                order_date: row[2],
                order_mode: row[3],
                customer_id: row[0],
                order_status: row[4],
                order_total: row[5],
                sales_rep_id: row[6],
                promotion_id: row[7],

                items: rows2.filter(row2 => row2[0] == row[1]).map(row2 => {
                    return {
                        order_id: row2[0],
                        line_item_id: row2[1],
                        product_id: row2[2],
                        unit_price: row2[3],
                        quantity: row2[4],

                        product_name: row2[5]
                    }
                }).sort((a, b) => a.line_item_id - b.line_item_id),

                customer_name: row[8]+' '+row[9]
            }
        });

        return orders;
    }

    async find_products(search: string) {
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := buscar_productos(:search);
            END;
            `,
            {
                search: search,
                ret: { dir: BIND_OUT, type: CURSOR }
            }
        );
        let resultSet = result.outBinds['ret'];
        let rows = [];
        while (true) {
            let row = await resultSet.getRow();
            if (!row) {
                break;
            }
            rows.push(row);
        }
        await resultSet.close();

        let products: ProductData[] = rows.map(row => {
            return {
                product_id: row[0],
                product_name: row[1],
                product_description: row[2],
                category_id: row[3],
                weight_class: row[4],
                warranty_period: '',
                supplier_id: row[5],
                product_status: row[6],
                list_price: row[7],
                min_price: row[8],
                catalog_url: row[9]
            }
        });

        return products;
    }

    async count_customers() : Promise<number>{
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := OBTENER_CANTIDAD_CLIENTES_TOTALES();
            END;
            `,
            {
                ret: { dir: BIND_OUT, type: NUMBER }
            }
        );
        let res: number = result.outBinds['ret'];

        return res;
    }

    async count_orders() : Promise<number>{
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := OBTENER_CANTIDAD_ORDENES_TOTALES();
            END;
            `,
            {
                ret: { dir: BIND_OUT, type: NUMBER }
            }
        );
        let res: number = result.outBinds['ret'];

        return res;
    }

    async count_products() : Promise<number>{
        const result = await this.connection.execute(
            `
            BEGIN
                :ret := OBTENER_CANTIDAD_PRODUCTOS_TOTALES();
            END;
            `,
            {
                ret: { dir: BIND_OUT, type: NUMBER }
            }
        );
        let res: number = result.outBinds['ret'];

        return res;
    }

    async insert_customer(customer: CustomerData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    INSERT_CUSTOMER(:customer_id, :cust_first_name, :cust_last_name, :credit_limit, :cust_email, :income_level, :region);
                END;
                `,
                {
                    customer_id: customer.customer_id,
                    cust_first_name: customer.cust_first_name,
                    cust_last_name: customer.cust_last_name,
                    credit_limit: customer.credit_limit,
                    cust_email: customer.cust_email,
                    income_level: customer.income_level,
                    region: customer.region
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async update_customer(customer_id: number, customer: CustomerData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    UPDATE_CUSTOMER(:og_customer_id, :customer_id, :cust_first_name, :cust_last_name, :credit_limit, :cust_email, :income_level, :region);
                END;
                `,
                {
                    og_customer_id: customer_id,
                    customer_id: customer.customer_id,
                    cust_first_name: customer.cust_first_name,
                    cust_last_name: customer.cust_last_name,
                    credit_limit: customer.credit_limit,
                    cust_email: customer.cust_email,
                    income_level: customer.income_level,
                    region: customer.region
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async delete_customer(customer_id: number) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    DELETE_CUSTOMER(:customer_id);
                END;
                `,
                {
                    customer_id: customer_id
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async insert_product(product: ProductData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    INSERT_PRODUCT(:product_id, :product_name, :product_description, :category_id, :weight_class, :warranty_period, :supplier_id, :product_status, :list_price, :min_price, :catalog_url);
                END;
                `,
                {
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_description: product.product_description,
                    category_id: product.category_id,
                    weight_class: product.weight_class,
                    warranty_period: product.warranty_period,
                    supplier_id: product.supplier_id,
                    product_status: product.product_status,
                    list_price: product.list_price,
                    min_price: product.min_price,
                    catalog_url: product.catalog_url
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async update_product(product_id: number, product: ProductData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    UPDATE_PRODUCTS(:og_product_id, :product_id, :product_name, :product_description, :category_id, :weight_class, :warranty_period, :supplier_id, :product_status, :list_price, :min_price, :catalog_url);
                END;
                `,
                {
                    og_product_id: product_id,
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_description: product.product_description,
                    category_id: product.category_id,
                    weight_class: product.weight_class,
                    warranty_period: product.warranty_period,
                    supplier_id: product.supplier_id,
                    product_status: product.product_status,
                    list_price: product.list_price,
                    min_price: product.min_price,
                    catalog_url: product.catalog_url
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async delete_product(product_id: number) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    DELETE_PRODUCT(:product_id);
                END;
                `,
                {
                    product_id: product_id
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async create_order(order: OrderData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    CREATE_ORDER(:order_id, TO_TIMESTAMP(
                        :order_date, 'YYYY-MM-DD'
                    ), :order_mode, :customer_id, :order_status, :order_total, :sales_rep_id, :promotion_id);
                END;
                `,
                {
                    order_id: order.order_id,
                    order_date: order.order_date,
                    order_mode: order.order_mode,
                    customer_id: order.customer_id,
                    order_status: order.order_status,
                    order_total: order.order_total,
                    sales_rep_id: order.sales_rep_id,
                    promotion_id: order.promotion_id
                }
            );
            for(let i=0; i<order.items.length; i++){
                const result2 = await this.connection.execute(
                    `
                    BEGIN
                        INSERT_ORDER_ITEM(:order_id, :line_item_id, :product_id, :unit_price, :quantity);
                    END;
                    `,
                    {
                        order_id: order.order_id,
                        line_item_id: order.items[i].line_item_id,
                        product_id: order.items[i].product_id,
                        unit_price: order.items[i].unit_price,
                        quantity: order.items[i].quantity
                    }
                );
            }
        }catch(e){
            console.log(e);
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async update_order(order_id: number, order: OrderData) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    UPDATE_ORDER(:og_order_id, :order_id, TO_TIMESTAMP(
                        :order_date, 'YYYY-MM-DD'
                    ), :order_mode, :customer_id, :order_status, :order_total, :sales_rep_id, :promotion_id);
                END;
                `,
                {
                    og_order_id: order_id,
                    order_id: order.order_id,
                    order_date: order.order_date,
                    order_mode: order.order_mode,
                    customer_id: order.customer_id,
                    order_status: order.order_status,
                    order_total: order.order_total,
                    sales_rep_id: order.sales_rep_id,
                    promotion_id: order.promotion_id
                }
            );
            for(let i=0; i<order.items.length; i++){
                const result2 = await this.connection.execute(
                    `
                    BEGIN
                        UPDATE_ORDER_ITEM(:order_id, :line_item_id, :product_id, :unit_price, :quantity);
                    END;
                    `,
                    {
                        order_id: order.order_id,
                        line_item_id: order.items[i].line_item_id,
                        product_id: order.items[i].product_id,
                        unit_price: order.items[i].unit_price,
                        quantity: order.items[i].quantity
                    }
                );
            }
        }catch(e){
            console.log(e);
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

    async delete_order(order_id: number) {
        try{
            const result = await this.connection.execute(
                `
                BEGIN
                    DELETE_ORDER(:order_id);
                END;
                `,
                {
                    order_id: order_id
                }
            );
        }catch(e){
            return {
                success: false,
                error: e.errorNum
            };
        }
        return {
            success: true
        };
    }

}

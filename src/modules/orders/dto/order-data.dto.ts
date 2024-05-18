
export class OrderData {
    order_id?: number;
    order_date?: string;
    order_mode?: string;
    customer_id?: number;
    order_status?: string;
    order_total?: number;
    sales_rep_id?: number;
    promotion_id?: number;

    items: OrderItemData[] = [];

    customer_name?: string;
}

export class OrderItemData {
    order_id?: number;
    line_item_id?: number;
    product_id?: number;
    unit_price?: number;
    quantity?: number;

    product_name?: string;
}

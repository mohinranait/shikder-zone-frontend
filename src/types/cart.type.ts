
export type TCartItems = {
    user: string | null;
    product: string;
    quantity: number;
    attributes?: Record<string, string> 
    price: number;
    sku?:string;
    shippingCharge?:number;
    tax?: number;
    pImage:string;
    pName:string;
}
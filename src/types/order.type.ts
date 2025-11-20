import { TAddress, TAddressResponse } from "./address.type";
import { TCartItems } from "./cart.type";

export type TEnhancedCartItem = TCartItems & {
    image: string;
    name: string;
  };

export type TOrderForm = {
  userId?: string;
  shippingAddress?: TAddress;
  shippingAddressId?: string;
  items: TEnhancedCartItem[];
  totalAmount: number;
  uid: string;
  email?: string;
  phone: string;
};

export type TOrderStatus= "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"|'Returned';
export type TOrder  = TOrderForm & {
  _id:string;
  status: TOrderStatus;
  shippingAddressId: TAddressResponse,
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  paymentMethod: "COD" | "Card" | "Bank Transfer";
  createdAt: Date;
  updatedAt: Date;
};
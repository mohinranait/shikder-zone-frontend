import { getSingleOrderByUid } from "@/actions/orderApi";
import OrderDetailsComponent from "@/components/pages/dashboard/orders/order-details-component";
import React from "react";

const OrderDetailsPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  // Order UID
  const orderId = params?.orderId;

  const res = await getSingleOrderByUid(orderId);

  return <OrderDetailsComponent order={res.payload} />;
};

export default OrderDetailsPage;

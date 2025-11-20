"use client";
import { useState } from "react";
import {
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Hash,
  FileText,
  Home,
  Briefcase,
  Box,
  X,
  Repeat2,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/types/order.type";
import OrderItem from "./order-item";
import { format } from "date-fns";
import { currency } from "@/helpers/utils";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
  reviews: number;
}

const typeObject: Record<string, { icon: JSX.Element; className: string }> = {
  Home: {
    icon: <Home size={13} />,
    className: "bg-blue-100 hover:bg-blue-100 text-blue-800",
  },
  Office: {
    icon: <Briefcase />,
    className: "bg-green-100 hover:bg-green-100 text-green-800",
  },
  Others: {
    icon: <Box />,
    className: "bg-gray-100 hover:bg-gray-100 text-gray-800",
  },
};

const receiveFrom = (type: "Home" | "Office" | "Others") =>
  typeObject[type ?? "Others"];

const statusSteps = [
  {
    key: "Pending",
    label: "Order Placed",
    icon: Clock,
    description: "Your order has been placed",
  },
  {
    key: "Processing",
    label: "Processing",
    icon: Package,
    description: "We're preparing your order",
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: Truck,
    description: "Your order is on the way",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: CheckCircle,
    description: "Order delivered successfully",
  },
  {
    key: "Cancelled",
    label: "Cancelled",
    icon: X,
    description: "Order delivery cancel",
  },
  {
    key: "Returned",
    label: "Returned",
    icon: Repeat2,
    description: "Return your order",
  },
];

type Props = {
  order: TOrder;
};
export default function OrderDetailsComponent({ order }: Props) {
  const router = useRouter();
  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  // Sub total
  const subTotal = order?.items?.reduce(
    (acc, cur) => acc + cur.price * cur?.quantity,
    0
  );
  // Calculate total tax
  const taxTotal = order?.items?.reduce(
    (acc, cur) => acc + (cur?.tax || 0) * cur?.quantity,
    0
  );

  // Calculate total shipping charge
  const shippingTotal = order?.items?.reduce(
    (acc, cur) => acc + (cur?.shippingCharge || 0) * cur?.quantity,
    0
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const currentStatusIndex = getStatusIndex(order?.status);

  const formatCurrency = (amount: number) => `${currency}${amount.toFixed(2)}`;

  const address = order?.shippingAddressId;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const downloadInvoicePDF = async () => {
    setIsDownloading(true);
    try {
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;

      const invoiceElement = document.createElement("div");
      invoiceElement.innerHTML = `
        <div style="
          font-family: 'Helvetica', 'Arial', sans-serif;
          max-width: 850px;
          margin: 0 auto;
          padding: 50px;
          background: #ffffff;
          color: #1a1a1a;
          line-height: 1.7;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
          <!-- Header -->
          <div style="
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 4px solid #4a90e2;
            padding-bottom: 20px;
          ">
            <img src="https://via.placeholder.com/150x50?text=Your+Company+Logo" alt="Company Logo" style="margin-bottom: 10px;">
            <h1 style="
              font-size: 28px;
              font-weight: 700;
              color: #2c3e50;
              margin: 0;
            ">INVOICE</h1>
            <p style="color: #7f8c8d; font-size: 14px;">Invoice #INV-0000</p>
          </div>

          <!-- Invoice Info -->
          <div style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            gap: 30px;
          ">
            <div style="flex: 1;">
              <h3 style="
                color: #2c3e50;
                font-size: 18px;
                margin-bottom: 15px;
                border-bottom: 2px solid #ecf0f1;
                padding-bottom: 5px;
              ">Bill To:</h3>
              <div style="color: #7f8c8d;">
                <p style="margin: 5px 0; font-weight: 500;">Mohin Rana</p>
                <p style="margin: 5px 0;">mohin@gmail.com</p>
                <p style="margin: 5px 0;">01728068200</p>
               <p style="margin: 5px 0;">Uttara, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div style="flex: 1;">
              <h3 style="
                color: #2c3e50;
                font-size: 18px;
                margin-bottom: 15px;
                border-bottom: 2px solid #ecf0f1;
                padding-bottom: 5px;
              ">Invoice Details:</h3>
              <div style="color: #7f8c8d;">
                <p style="margin: 8px 0;"><strong>Order #:</strong> ${
                  order?.uid || "ORD-0000"
                }</p>
                <p style="margin: 8px 0;"><strong>Date:</strong> ${format(
                  new Date(Date.now()),
                  "dd MMM yyyy"
                )}</p>
                <p style="margin: 8px 0;"><strong>Status:</strong> <span style="
                  background: #e8f4f8;
                  color: #3498db;
                  padding: 5px 10px;
                  border-radius: 5px;
                  font-size: 12px;
                  text-transform: capitalize;
                ">${order?.status || "N/A"}</span></p>
                <p style="margin: 8px 0;"><strong>Tracking #:</strong> ${
                  order?.uid || "N/A"
                }</p>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #2c3e50; font-size: 18px; margin-bottom: 20px;">Order Items</h3>
            <table style="
              width: 100%;
              border-collapse: collapse;
              background: #ffffff;
              border: 1px solid #ecf0f1;
              border-radius: 8px;
              overflow: hidden;
            ">
              <thead>
                <tr style="background: #f5f6fa;">
                  <th style="
                    padding: 12px 15px;
                    text-align: left;
                    font-weight: 600;
                    color: #2c3e50;
                    border-bottom: 2px solid #ecf0f1;
                  ">Description</th>
                  <th style="
                    padding: 12px 15px;
                    text-align: right;
                    font-weight: 600;
                    color: #2c3e50;
                    border-bottom: 2px solid #ecf0f1;
                  ">Unit Price</th>
                  <th style="
                    padding: 12px 15px;
                    text-align: center;
                    font-weight: 600;
                    color: #2c3e50;
                    border-bottom: 2px solid #ecf0f1;
                  ">Qty</th>
                  <th style="
                    padding: 12px 15px;
                    text-align: right;
                    font-weight: 600;
                    color: #2c3e50;
                    border-bottom: 2px solid #ecf0f1;
                  ">Total</th>
                </tr>
              </thead>
              <tbody>
                ${(order?.items || [])
                  .map(
                    (item, index) => `
                  <tr style="${
                    index % 2 === 0
                      ? "background: #fafafa;"
                      : "background: #ffffff;"
                  }">
                    <td style="
                      padding: 12px 15px;
                      border-bottom: 1px solid #ecf0f1;
                      color: #7f8c8d;
                    ">${item.name}</td>
                    <td style="
                      padding: 12px 15px;
                      text-align: right;
                      border-bottom: 1px solid #ecf0f1;
                      color: #7f8c8d;
                    ">${formatCurrency(item.price)}</td>
                    <td style="
                      padding: 12px 15px;
                      text-align: center;
                      border-bottom: 1px solid #ecf0f1;
                      color: #7f8c8d;
                    ">${item.quantity}</td>
                    <td style="
                      padding: 12px 15px;
                      text-align: right;
                      border-bottom: 1px solid #ecf0f1;
                      color: #7f8c8d;
                      font-weight: 500;
                    ">${formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
            <div style="
              min-width: 300px;
              border: 1px solid #ecf0f1;
              border-radius: 8px;
              overflow: hidden;
              background: #ffffff;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                padding: 10px 15px;
                background: #f5f6fa;
                border-bottom: 1px solid #ecf0f1;
              ">
                <span style="color: #2c3e50;">Subtotal:</span>
                <span style="color: #2c3e50;">${formatCurrency(subTotal)}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                padding: 10px 15px;
                background: #ffffff;
                border-bottom: 1px solid #ecf0f1;
              ">
                <span style="color: #2c3e50;">Shipping:</span>
                <span style="color: #2c3e50;">${formatCurrency(
                  shippingTotal
                )}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                padding: 10px 15px;
                background: #f5f6fa;
                border-bottom: 1px solid #ecf0f1;
              ">
                <span style="color: #2c3e50;">Tax:</span>
                <span style="color: #2c3e50;">${formatCurrency(taxTotal)}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                padding: 10px 15px;
                background: #ffffff;
                border-bottom: 1px solid #ecf0f1;
              ">
                <span style="color: #2c3e50;">Discount:</span>
                <span style="color: #2c3e50;">-${formatCurrency(0)}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                padding: 12px 15px;
                background: #4a90e2;
                color: #ffffff;
                font-weight: 600;
                font-size: 16px;
              ">
                <span>Total:</span>
                <span>${formatCurrency(order?.totalAmount || 0)}</span>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div style="
            background: #f9fbfd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4a90e2;
            margin-bottom: 40px;
          ">
            <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Payment Method</h3>
            <p style="color: #7f8c8d; margin: 0;">${
              order?.paymentMethod || "N/A"
            } </p>
          </div>

          <!-- Footer -->
          <div style="
            text-align: center;
            padding-top: 30px;
            border-top: 2px solid #ecf0f1;
            color: #7f8c8d;
          ">
            <p style="margin: 10px 0; font-size: 16px; font-weight: 600; color: #4a90e2;">
              Thank You for Your Business!
            </p>
            <p style="margin: 5px 0; font-size: 12px;">
              For inquiries, contact us at <a href="mailto:support@yourcompany.com" style="color: #3498db; text-decoration: none;">support@yourcompany.com</a>
            </p>
            <p style="margin: 5px 0; font-size: 12px;">
              Phone: ${"+1 (555) 123-4567"} | Website: <a href="https://www.yourcompany.com" style="color: #3498db; text-decoration: none;">www.yourcompany.com</a>
            </p>
          </div>
        </div>
      `;

      invoiceElement.style.position = "absolute";
      invoiceElement.style.left = "-9999px";
      invoiceElement.style.top = "0";
      document.body.appendChild(invoiceElement);

      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 850,
        height: invoiceElement.scrollHeight,
      });

      document.body.removeChild(invoiceElement);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Invoice-${order?.uid || "INV-0000"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8  space-y-4">
        {/* header */}
        <div className="">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                type="button"
                size={"icon"}
                variant={"outline"}
              >
                <ArrowLeft />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Order Details</h1>
                <p className="text-sm text-gray-500 uppercase">
                  Order #{order?.uid}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={getStatusColor(order?.status)}
                variant="secondary"
              >
                {order?.status}
              </Badge>
              <Button
                onClick={downloadInvoicePDF}
                disabled={isDownloading}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? "Generating PDF..." : "Download Invoice"}
              </Button>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">
                    {format(new Date(order?.createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Invoice Number</p>
                  <p className="font-medium uppercase">INV-{order?.uid}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-medium uppercase">TRK-{order?.uid}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Order Progress */}
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Order Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    return (
                      <div
                        key={step.key}
                        className="flex flex-col items-center text-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted
                              ? isCurrent
                                ? "bg-blue-600 text-white"
                                : "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4
                          className={`font-medium text-sm ${
                            isCompleted ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step.key}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            isCompleted ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order?.items.map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="grid sm:grid-cols-2 gap-4 xl:grid-cols-1 ">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span> {formatCurrency(subTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{formatCurrency(shippingTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>{formatCurrency(taxTotal)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-main">
                    {formatCurrency(order?.totalAmount)}
                  </span>
                </div>
              </CardContent>
            </Card>
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {order?.userId ? (
                  <div className="space-y-2">
                    <p className="font-medium">
                      {address?.firstName} {address?.lastName}
                    </p>

                    <p className="text-sm text-gray-600">
                      Phone: {address?.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Address: {address?.address}, {address?.city},
                      {address?.subCity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive from:{" "}
                      <Badge
                        className={`inline-flex gap-1 items-center ${
                          receiveFrom(address?.type).className
                        }`}
                      >
                        {receiveFrom(address?.type)?.icon} {address?.type}
                      </Badge>
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-400 rounded"></div>
                  <span className="text-sm">COD</span>
                </div>
              </CardContent>
            </Card>
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

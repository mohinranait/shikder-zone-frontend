import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currency } from "@/helpers/utils";
import { useAppDispatch } from "@/hooks/useRedux";
import useViewSingleProductByModal from "@/hooks/useViewSingleProductByModal";
import { setCommentModal } from "@/redux/features/uiSlice";
import { TEnhancedCartItem } from "@/types/order.type";
import { Eye, MessageSquareText, RotateCcw } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  item: TEnhancedCartItem;
};
const OrderItem = ({ item }: Props) => {
  const { viewProductByModal } = useViewSingleProductByModal();
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <Badge
            className="absolute -top-2 -right-2 bg-main text-white text-xs px-2 py-1 rounded-full"
            variant="secondary"
          >
            Qty: {item.quantity}
          </Badge>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{item.name}</h3>
          <p className="text-lg font-bold text-main">
            {currency}
            {item.price}
          </p>
          <p className="text-xs text-muted-foreground">
            Total: {currency}
            {(item.price * item.quantity).toFixed(2)}
          </p>

          {item?.attributes &&
            Object.keys(item?.attributes)?.map((attr) => {
              if (!item?.attributes) {
                return;
              }
              return (
                <p key={attr} className="text-xs text-muted-foreground">
                  {attr}: {item?.attributes[attr]}
                </p>
              );
            })}
        </div>
      </div>

      <div className="flex mt-3 sm:mt-0 items-center gap-2">
        <Button
          title="Buy Again"
          variant="outline"
          size="sm"
          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
        </Button>
        <Button
          onClick={() => viewProductByModal(item?.product)}
          type="button"
          title="View Item"
          variant="outline"
          size="sm"
        >
          <Eye className="h-4 w-4 mr-1" />
        </Button>
        <Button
          onClick={() => {
            dispatch(
              setCommentModal({
                name: item?.name,
                pId: item?.product,
                image: item?.image,
              })
            );
          }}
          title="Review"
          variant="outline"
          size="sm"
        >
          <MessageSquareText className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;

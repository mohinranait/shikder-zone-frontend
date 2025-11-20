import { getSingleProduct } from "@/actions/productApi";
import { setProductModal } from "@/redux/features/uiSlice";
import { TProduct } from "@/types/product.type";
import { useAppDispatch } from "./useRedux";

const useViewSingleProductByModal = () => {
  const dispatch = useAppDispatch();

  const viewProductByModal = async (productId: string) => {
    if (!productId) {
      return;
    }

    try {
      const res = await getSingleProduct(productId, "id");
      if (res.success) {
        const product: TProduct = res?.payload;
        dispatch(setProductModal(product));
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return { viewProductByModal };
};

export default useViewSingleProductByModal;

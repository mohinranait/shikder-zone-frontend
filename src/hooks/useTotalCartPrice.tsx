import { useAppSelector } from "./useRedux";

const useTotalCartPrice = () => {
  const { carts } = useAppSelector((state) => state.cart);

  return carts.reduce((total, cart) => {
    return total + cart.price * cart.quantity;
  }, 0);
};

export default useTotalCartPrice;

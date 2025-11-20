import { areObjectEqual } from "@/helpers/equalObject";
import { TCartItems } from "@/types/cart.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PropsType = {
    carts: TCartItems[],
    timestamp: number | null,
    totalQuantity: number,
    totalTax:number,
    totalShipping:number,
}

const initialState:PropsType = {
    carts: [],
    timestamp:null,
    totalQuantity: 0,
    totalTax: 0,    
    totalShipping: 0,
}

const shoppingCartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setAllCarts: (state, action:PayloadAction<TCartItems[]>) => {
            state.carts = action?.payload
        },
        addToCart:(state, action:PayloadAction<TCartItems>) => {
            const {product, quantity,attributes} = action?.payload
            const findCart = state.carts?.find((cart) => cart?.product === product);
            if (findCart?.product) {
                if( !areObjectEqual(findCart?.attributes || {}, attributes||{})   ){
                    // Add new product in shopping cart
                    state.carts = [...state.carts, action?.payload]
                }else{
                    // Already exists product in shopping cart
                    state.carts = state.carts?.map(cart => cart?.product === findCart?.product ? ({
                        ...cart,
                        quantity,
                    }) : cart )
                }
                
            }else{
                // Add new product in shopping cart
                state.carts = [...state.carts, action?.payload]
            }

            state.timestamp = Date.now();
            // Calculate total price and quantity
            state.totalQuantity = state.carts?.reduce((total, cart) => total + (cart?.quantity || 0), 0);
            // Calculate total shipping
            state.totalShipping = state.carts?.reduce((total, cart) => total + (cart?.shippingCharge || 0), 0);
            // Calculate total tax
            state.totalTax = state.carts?.reduce((total, cart) => total + (cart?.tax || 0), 0);
            
        },
        removeCart:(state, action:PayloadAction<string>) => {
            state.carts = state.carts?.filter(cart => cart?.product !== action?.payload)
            state.totalShipping = state.carts?.reduce((total, cart) => total + (cart?.shippingCharge || 0), 0);
            state.totalTax = state.carts?.reduce((total, cart) => total + (cart?.tax || 0), 0);
        }
    }
})

export const {addToCart,setAllCarts,removeCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
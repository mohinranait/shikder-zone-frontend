import { TRatingModal } from '@/components/modals/comment-modal'
import { TProduct } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



type TInitialStateType = {
    cartSidebarOpen: boolean,
    commentModalOpen: null | TRatingModal,
    productModalOpen: null | TProduct,
    
}

const initialState:TInitialStateType  = {
  cartSidebarOpen: false,
  commentModalOpen: null,
  productModalOpen: null
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCartSidebarOpen:(state, action: PayloadAction<boolean>) => {
        state.cartSidebarOpen = action.payload ? action?.payload : false;
    },
    setCommentModal:(state, action: PayloadAction<null | TRatingModal>) => {
        state.commentModalOpen = action.payload ? action?.payload : null;
    },
    setProductModal:(state, action: PayloadAction<null | TProduct>) => {
        state.productModalOpen = action.payload ? action?.payload : null;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setCartSidebarOpen,setCommentModal,setProductModal } = uiSlice.actions

export default uiSlice.reducer
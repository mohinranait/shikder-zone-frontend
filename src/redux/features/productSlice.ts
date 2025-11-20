import { calculateProductPrice } from '@/helpers/product.helper'
import { TProduct, TVariation } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type TFilter = {
  categoryIds?:string[],
  brandIds?:string[],
  priceRange?:[number, number],
  ratings?:string[],
  shipping?:'yes'|'no',
  sortBy?:string,
  status?:string[],
  search?:string,
}

type TInitialStateType = {
    product: TProduct,
    products: TProduct[],
    filterProducts: TProduct[],
    selectedProduct: TProduct | null,
    variant: TVariation | null;
}

const initialState:TInitialStateType  = {
  product: {} as TProduct,
  products: [],
  filterProducts:[],
  selectedProduct: null,
  variant: null,
}


const productFiltersMethod  = (products:TProduct[], filters:TFilter) => {
  const { categoryIds, brandIds, priceRange,search  } = filters;
  
  const filteredProducts = products.filter((product) => {
    let isValid = true;
    if (categoryIds && categoryIds.length > 0) {
      isValid = isValid && categoryIds.some(catId => product.category?.includes(catId) );
    }

    if (brandIds && brandIds.length > 0) {
      isValid = isValid && brandIds.some(brandId => product.brand?.includes(brandId) );
    }

    if (search && search.length > 0) {
      isValid = isValid &&  product.name?.toLowerCase()?.includes(search.toLowerCase()) ;
    }

    // Price range filter
    if (priceRange && priceRange.length === 2) {
      const finalPrice = Number(calculateProductPrice(product));

      if(!isNaN(finalPrice)){
        // For single product
        isValid = isValid && finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      }else{
        // for variable products
          const [min, max] = calculateProductPrice(product).split('-').map(Number);
          isValid = isValid && ((min >= priceRange[0] && min <= priceRange[1]) ||
        (max >= priceRange[0] && max <= priceRange[1]));
      }

    }

    // if (shippingCharge ) {
    //   isValid = isValid && product.freeShipping === shipping;
    // }

    return isValid;
  });

  return filteredProducts;
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    setProduct:(state, action: PayloadAction<TProduct>) => {
      // Set Single product 
        state.product = action.payload;
    },
    setProducts: (state, action: PayloadAction<{products:TProduct[], filters: TFilter  }>) => {
      // Set all products
        state.products = action?.payload?.products

        const filteredProducts = productFiltersMethod(action?.payload?.products , action?.payload?.filters);

      state.filterProducts = filteredProducts;
    },
    updateSingleProduct : (state, action: PayloadAction<TProduct>) => {
      // Update single product
        const product = action?.payload
        state.products = state.products.map((d) => d._id === product._id ? product : d)
    },
    updateProducts: (state, action: PayloadAction<TProduct>) => {
        state.products = [...state.products, action?.payload]
    },
    setSelectedProduct: (state, action: { payload: TProduct | null }) => {
      // Update selected product state
      state.selectedProduct = action?.payload;
    },
    updateVariant: (state, action: PayloadAction<TVariation>) => {
      state.variant = action?.payload
    },
    setFilterProducts: (state, action: PayloadAction<TFilter>) => {
      
      const filteredProducts = productFiltersMethod(state.products, action?.payload);
      state.filterProducts = filteredProducts;
    },
    addSortingProducts: (state, action: PayloadAction<{filter:'phl'|'plh'|'az'|'za'}>) => {
      const { filter } = action?.payload;
      if(filter === 'plh'){
        state.filterProducts = [...state.filterProducts].sort((a, b) => (a.price?.discountValue ? a.price?.discountValue : a?.price?.productPrice || 0) - (b.price?.discountValue ? b.price?.discountValue : b?.price?.productPrice || 0));
      } else if(filter === 'phl'){
        state.filterProducts = [...state.filterProducts].sort((a, b) => (b.price?.discountValue ? b.price?.discountValue : b?.price?.productPrice || 0) - (a.price?.discountValue ? a.price?.discountValue : a?.price?.productPrice || 0));
      } else if(filter === 'az'){
        state.filterProducts = [...state.filterProducts].sort((a, b) => a.name.localeCompare(b.name));
      } else if(filter === 'za'){
        state.filterProducts = [...state.filterProducts].sort((a, b) => b.name.localeCompare(a.name));
      }
    }  
  },
})

// Action creators are generated for each case reducer function
export const {  setProduct,setProducts,updateProducts,updateSingleProduct,setSelectedProduct,updateVariant,setFilterProducts,addSortingProducts } = productSlice.actions

export default productSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBrandType } from "@/types/brand.type";



type TInitialStateType = {
  selectedBrand: TBrandType | null;
  brands: TBrandType[];
};

const initialState: TInitialStateType = {
    selectedBrand: null,
    brands: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    addBrands: (state, action: PayloadAction<TBrandType[]> ) => {
      // Set all brands
        state.brands = [ ...action?.payload ];
    },
    setSelectedBrand: (state, action: PayloadAction<TBrandType|null> ) => {
      // Update selected brand state
      state.selectedBrand = action?.payload;
    },
  },
});

export const { addBrands, setSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;

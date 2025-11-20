import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategoryType } from "@/types/category.type";


type TInitialStateType = {
  selectedCategory: TCategoryType | null;
  categories: TCategoryType[];
};

const initialState: TInitialStateType = {
  selectedCategory: null,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategorys: (state, action: PayloadAction<TCategoryType[]>) => {
      // Add all categories in state
      state.categories = [...action?.payload];
    },
    setSelectedCategory: (state, action: { payload: TCategoryType | null }) => {
      // Update selectedCategory state
      state.selectedCategory = action?.payload;
    },
  },
});

export const { addCategorys, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TAttributeType } from "@/types/attribute.type";



type TInitialStateType = {
  attributes: TAttributeType[];
};

const initialState: TInitialStateType = {
    attributes: [],
};

export const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    addAttribute: (state, action: { payload: TAttributeType [] }) => {
      // Update attributes state
      state.attributes = action.payload
    },
  },
});

export const { addAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TAttributeConfigType } from "@/types/attributeConfig.type";

type TInitialStateType = {
  attributeConfigs: TAttributeConfigType[];
};

const initialState: TInitialStateType = {
  attributeConfigs: [],
};

export const attributeConfigSlice = createSlice({
  name: "attributeConfig",
  initialState,
  reducers: {
    addAttributeConfig: (state, action: { payload: TAttributeConfigType[] }) => {
      // Update attributes state      
      state.attributeConfigs = action?.payload
    },
  },
});

export const { addAttributeConfig } = attributeConfigSlice.actions;
export default attributeConfigSlice.reducer;

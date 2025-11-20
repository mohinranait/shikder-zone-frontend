
import { TFavorites } from '@/types/favorites.type';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type TInitialStateType = {
    favorites: TFavorites[]
}

const initialState:TInitialStateType  = {
  favorites: []
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
   
    setFavorites:(state , action: PayloadAction<TFavorites[]>) => {
      state.favorites = action?.payload
    },
   
    removeFavorite:(state , action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
          (pr) => String(pr?._id) !== String(action.payload)
        );
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFavorites,removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
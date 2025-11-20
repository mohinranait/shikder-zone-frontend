import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  productReducer  from "./features/productSlice";
import  authReducer  from "./features/authSlice";
import  categoryReducer  from "./features/categorySlice";
import  brandReducer  from "./features/brandSlice";
import  mediaReducer  from "./features/mediaSlice";
import  attributeReducer  from "./features/attributeSlice";
import  attributeConfigReducer  from "./features/attributeConfigSlice";
import  shoppingCartReducer  from "./features/shoppingCartSlice";
import  favoriteReducer  from "./features/favoriteSlice";
import  uiReducer  from "./features/uiSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistAuth = {
    key: 'auth',
    storage,
}

const persistBrand = {
    key: 'brand',
    storage,
}

const persistCategory = {
    key: 'category',
    storage,
}

const timeInMillis  = 12 * 60 * 60 * 1000; 
const persistCarts = {
    key: 'cart',
    storage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    migrate: (state: any) => {
        // All cart items automatically remove after 12 hours
        const currentTimestamp = Date.now();

        if (state?.timestamp && currentTimestamp - state.timestamp > timeInMillis) {
            return Promise.resolve({
                carts: [],
                timestamp: null,
            });
        }

        return Promise.resolve(state);
    }
}

const persistedAuthReducer = persistReducer(persistAuth, authReducer)
const persistedCategoryReducer = persistReducer(persistCategory, categoryReducer)
const persistedBrandReducer = persistReducer(persistBrand, brandReducer)
const persistedCartReducer = persistReducer(persistCarts, shoppingCartReducer)

const rootReducer = combineReducers({
    product: productReducer,
    auth: persistedAuthReducer,
    category: persistedCategoryReducer,
    cart: persistedCartReducer,
    brand: persistedBrandReducer,
    media: mediaReducer,
    attributes: attributeReducer,
    attributeConfigs: attributeConfigReducer,
    ui: uiReducer,
    favorite: favoriteReducer,
})

export  const store = configureStore({
    reducer:rootReducer
})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
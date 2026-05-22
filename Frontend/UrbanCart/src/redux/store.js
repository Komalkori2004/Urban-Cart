import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./feature/authSlice";
import productReducer from "./feature/productSlice";
import cartReducer from "./feature/cartSlice";

export const store = configureStore({

    reducer: {
        auth: authReducer,
        products: productReducer,
        cart:cartReducer


    }

}); 
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./feature/authSlice";
import productReducer from "./feature/productSlice";

export const store = configureStore({

    reducer: {
        auth: authReducer,
        products: productReducer

    }

}); 
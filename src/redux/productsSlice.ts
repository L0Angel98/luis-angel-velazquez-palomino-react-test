import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureLocalStorage from "../utils/secureLocalStorage";
import { validationValueArray } from "../utils/validation";

interface Rating {
  rate?: number ,
  count?: number
}

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating 
}

interface ProductsState {
  data: Array<Product>
}

const initialState: ProductsState = {
  data: validationValueArray(secureLocalStorage.getSecureItem("products"))
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProducts: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      secureLocalStorage.setSecureItem("products", action.payload)

    },
    clearProducts: (state) => {
      state.data = [];
      secureLocalStorage.removeSecureItem("products")
    },
  },
});

export const { createProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;

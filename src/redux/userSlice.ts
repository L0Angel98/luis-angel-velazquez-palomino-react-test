import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureLocalStorage from "../utils/secureLocalStorage";

interface UserState {
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: secureLocalStorage.getSecureItem("session")?.email,
  isLoggedIn: secureLocalStorage.getSecureItem("session")?.isLoggedIn,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isLoggedIn = true;
      secureLocalStorage.setSecureItem("session", {
        email: action.payload,
        isLoggedIn: true
      })
    },
    logout: (state) => {
      state.email = null;
      state.isLoggedIn = false;
      secureLocalStorage.removeSecureItem("session")
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

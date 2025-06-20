
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; // Import the auth slice reducer




const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice reducer to the store

  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable serializable check if needed
//     }),
});

export default store;
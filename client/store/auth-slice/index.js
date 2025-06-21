import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// This file defines the authentication slice of the Redux store
// It manages the authentication state, including user login, logout, and admin status.

const initialState = {
  isAuthenticated: false,   
    user: null,     
    token: null,
    error: null,
    loading: false, 
    isAdmin: false, // New property to track admin status
    isLoading: false, // New property to track loading state
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set user data
      state.isAuthenticated = true; // Set authenticated status to true
    },
  },
  extraReducers: (builder) => {
    // Handle registration actions
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Set loading state to true when registration starts
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when registration is successful
        state.isAuthenticated = false; // Automatically log in the user after registration
        state.user = null; // Reset user data
        state.token = action.payload
        state.isAdmin = action.payload // Set admin status if applicable
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false when registration fails
        state.error = action.payload.error; // Store the error message
        state.isAuthenticated = false; // Ensure user is not authenticated on failure
        state.user = null; // Reset user data
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Set loading state to true when login starts
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when login is successful
        state.isAuthenticated = true; // Set authenticated status to true
        state.user = action.payload.checkUser; // Set user data
        state.token = action.payload.token; // Set token
        state.isAdmin = action.payload.checkUser?.role === 'admin'; // Set admin status
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false when login fails
        state.error = action.payload; // Store the error message
        state.isAuthenticated = false; // Ensure user is not authenticated on failure
        state.user = null; // Reset user data
        state.token = null; // Reset token
        state.isAdmin = false; // Reset admin status
      })

      // Handle logout action
      .addCase('auth/logout', (state) => {
        state.isAuthenticated = false; // Set authenticated status to false
        state.user = null; // Reset user data
        state.token = null; // Reset token
        state.isAdmin = false; // Reset admin status
        state.error = null; // Clear any error messages
        state.loading = false; // Reset loading state
      });
  }
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectIsLoading = (state) => state.auth.isLoading; // Selector for loading state
export const selectAuthState = (state) => state.auth; // Selector for the entire auth state
export const selectAuthStatus = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  token: state.auth.token,
  error: state.auth.error,
  loading: state.auth.loading,
});
export const selectAuthDetails = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
  isAdmin: state.auth.isAdmin,
}); // Selector for user and token details  
export const selectAuthErrorMessage = (state) => state.auth.error ? state.auth.error.message : null; // Selector for error message
export const selectAuthLoadingState = (state) => state.auth.loading; // Selector for loading state
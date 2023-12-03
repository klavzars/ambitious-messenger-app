import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const login = createAsyncThunk("auth/login", async (userLoginData, thunkAPI) => {
  try {
    return await authService.login(userLoginData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk("auth/register", async (userRegistrationData, thunkAPI) => {
  try {
    return await authService.register(userRegistrationData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  status: "idle",
  error: null,
  authStatus: "undetermined", // 'undetermined', 'auth', 'unauth'
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authStatus = "auth";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.authStatus = "unauth";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authStatus = "auth";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.authStatus = "unauth";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authStatus = "unauth";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset, setAuthStatus } = authSlice.actions;

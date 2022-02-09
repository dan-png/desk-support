import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register New User
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  console.log(user)
})

// Login User
export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => { },
})

export default authSlice.reducer
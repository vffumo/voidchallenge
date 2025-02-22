import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from "../services/api";
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/users/login', credentials);
    const token = response.data.data.token;

    // Save JWT in HttpOnly Cookies
    Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    toast.success('Logged in...');
    return { user: response.data.user, status: 'loggedIn' };
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed!');
    return rejectWithValue(error.response?.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  Cookies.remove('token');
  delete api.defaults.headers['Authorization'];
});

export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
  console.log('RUNNNNNN > auth');
  try {
    const token = Cookies.get('token');

    if (!token) {
      return { user: null, status: 'loggedOut' };
    }

    // Verify token with API (optional)
    // const response = await api.get('/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a', {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // return { user: response.data, status: 'loggedIn' };

    return { user: null, status: 'loggedIn' };
  } catch (error) {
    Cookies.remove('token'); // Remove invalid token
    return rejectWithValue('Session expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'loggedIn', // idle, loggedIn, loggedOut
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'loggedIn';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'loggedOut';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        // state.status = action.payload.status;
        state.status = 'loggedIn';
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.status = 'loggedOut';
      });
  },
});

export default authSlice.reducer;

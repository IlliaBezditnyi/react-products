import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://dummy-api.d0.acom.cloud/api/'

// interface UserData {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// };

interface ProductData {
  id: any;
  title: string;
  body: string;
  price: string;
  thumbnail: string;
  created_at: string;
  updated_at: string
}

export const getProducts = createAsyncThunk<ProductData[], string, {rejectValue: string}>(
  'user/login',
  async (token, {rejectWithValue}) => {
    const request = await axios.get(`${URL}products?page=6`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
    
    if (!request) {
      return rejectWithValue('Server Error!');
    }

    const response = await request.data.data;

    console.log(response);
    return response;
  }
);

const productSlice = createSlice({
  name: 'todos',
  initialState: {
    products: [{
      id: null,
      title: '',
      body: '',
      price: '',
      thumbnail: '',
      created_at: '',
      updated_at: '',
    }],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error ocurred'
      })
  }
});

export default productSlice.reducer;

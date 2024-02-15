import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://dummy-api.d0.acom.cloud/api/'

interface ProductItem {
  id: any;
  title: string;
  body: string;
  price: string;
  thumbnail: string;
  created_at: string;
  updated_at: string
}

interface Products {
  current_page: any;
  data: ProductItem[];
  per_page: number;
  total: number;
  loading: boolean;
  error: string;
}

interface QueryParams {
  access_token: string
  page: number;
  title?: string;
}

export const getProducts = createAsyncThunk<Products, QueryParams, {rejectValue: string}>(
  'user/login',
  async ({access_token, page, title}, {rejectWithValue}) => {
    const request = await axios.get(`${URL}products?page=${page}&title=${title}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }
  );
    
    if (!request) {
      return rejectWithValue('Server Error!');
    }

    const response = await request.data;

    console.log(response);
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    current_page: 1,
    data: [{
      id: null,
      title: '',
      body: '',
      price: '',
      thumbnail: '',
      created_at: '',
      updated_at: '',
    }],
    per_page: 0,
    total: 0,
    loading: false,
    error: '',
  },
  reducers: {
    setPage(state, action) {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.current_page = action.payload.current_page;
        state.data = action.payload.data;
        state.total = action.payload.total
        state.per_page = action.payload.per_page
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error ocurred'
      })
  }
});

export default productSlice.reducer;
export const {
  setPage
} = productSlice.actions

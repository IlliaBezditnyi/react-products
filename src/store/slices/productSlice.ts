import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

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
  current_page: number;
  data: ProductItem[];
  per_page: number;
  total: number;
  loading: boolean;
  error: string;
}

interface QueryParams {
  access_token: string
  page: number;
  name?: string;
  price_from?: string;
  price_to?: string;
  date_from?: string;
  date_to?: string;
}

export const getProducts = createAsyncThunk<Products, QueryParams, {rejectValue: string}>(
  'products/getProducts',
  async ({access_token, page, name, price_from, price_to, date_from, date_to}, {rejectWithValue}) => {
    try {
      const request = await axios.get(
        `${URL}/products?page=${page}
          &title=${name}
          &price_from=${price_from}
          &price_to=${price_to}
          &from=${date_from}
          &to=${date_to}`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      )

      return request.data;
    }
    catch(error: any) {
      return rejectWithValue(error.request.data);
    }
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
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Error ocurred'
      })
  }
});

export default productSlice.reducer;
export const {
  setPage
} = productSlice.actions;

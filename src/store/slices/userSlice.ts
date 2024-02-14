import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const api = 'https://dummy-api.d0.acom.cloud/api/'

// interface UserData {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// };

interface UserCridentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<{}, UserCridentials, {rejectValue: string}>(
  'user/login',
  async (userCridentials, {rejectWithValue}) => {
    const request = await axios.post(`${api}auth/login`, userCridentials);
    
    if (!request) {
      return rejectWithValue('Server Error!');
    }

    const response = await request.data;
    localStorage.setItem('user', JSON.stringify(response));

    console.log(response);
    return response;
  }
);

const userSlice = createSlice({
  name: 'todos',
  initialState: {
    user: {},
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Acces Denied! Invalid Credentials';
        } else {
          state.error = action.error.message || 'Internal server error. Please try again later';
        }
      })
  }
});

export default userSlice.reducer;

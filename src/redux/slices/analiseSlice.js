import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAnalise = createAsyncThunk(
  "analise/fetchAnalise",
  async () => {
    
     const response = await api.get("/last-week/de190ded-d23c-410c-89ac-89faf4dfb36a?=&_limit=10");
    //  console.log(response.data);
    return response.data;
  }
);


// export const fetchOtherData = createAsyncThunk(
//   "analise/fetchOtherData",
//   async () => {
//     const response = await api.get("/other-data");
//     return response.data;
//   }
// );

const analiseSlice = createSlice({
  name: "analise",
  initialState: {
    dataAnalise: [],
    // otherData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalise.fulfilled, (state, action) => {
        state.loading = false;
        state.dataAnalise = action.payload;
      })
      .addCase(fetchAnalise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  
  },
});

export default analiseSlice.reducer;

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

export const fetchSector = createAsyncThunk(
  "analise/fetchSector",
  async () => {
     const response = await api.get("/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a");
    //  console.log(response.data);
    return response.data;
  }
);

export const fetchArea = createAsyncThunk(
  "analise/fetchArea",
  async (sectorID, { rejectWithValue }) => {
    try {
      const response = await api.get(`/areas?&sector=${sectorID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export function getSearchAnalise(){

}

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
    filteredItems: [],

    dataArea: [],
    dataSector: [],

    dataSearch: [],
    dataFilter: [],
    // otherData: [],
    loading: false,
    error: null,
    status: 'idle',
    searchTerm: "", sectorFilter: "", areaFilter: "",
  },
  reducers: {
    // Search
    searchByName: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      state.searchTerm = query;
      
      // run it
      if (!query) { } 
  
      state.filteredItems = {
        ...state.dataAnalise,
        data: {
          ...state.dataAnalise?.data,
          technicians: 
          // filter here
          state.filteredItems = state.dataAnalise?.data?.technicians.filter(technician => 
          technician.technician_name.toLowerCase().includes(query)  
          )
          // end of filter
        }

      };
    },
    // Filter
    filterBySector: (state, action) => (state, action) => {
      const query = action.payload.trim().toLowerCase();
      state.sectorFilter = query;
      
      // run it
      if (!query) { } 
     
      state.filteredItems = {
        ...state.dataAnalise,
        data: {
          ...state.dataAnalise?.data,
          technicians: 
          // filter here
          state.filteredItems = state.dataAnalise?.data?.technicians.filter(technician => 
          technician.technician_name.toLowerCase().includes(query)  
          )
          // end of filter
        }
      };

      console.log(state.filteredItems);
    },
    
  },
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

export const { searchByName } = analiseSlice.actions;
export default analiseSlice.reducer;

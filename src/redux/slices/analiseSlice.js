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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


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
    filterFinalHandler: (state, action) => {
      
      if( state.searchTerm.length>0 || state.sectorFilter.length>0 || state.areaFilter.length>0 ){

        let tempFilter = state.dataAnalise;

        // FILTER SECTORS
        if (state.sectorFilter.length > 0) {
          tempFilter = {
            ...tempFilter,
        
            data: {
              ...tempFilter?.data,
        
              technicians: tempFilter?.data?.technicians.filter(technician =>
                technician.sector?.toLowerCase().includes(state.sectorFilter.toLowerCase())
              )
            }
          };
        }

        // FILTER AREAS
        if (state.areaFilter.length > 0) {
          tempFilter = {
            ...tempFilter,
        
            data: {
              ...tempFilter?.data,
        
              technicians: tempFilter?.data?.technicians.filter(technician =>
                technician.area_name?.toLowerCase().includes(state.areaFilter.toLowerCase())
              )
            }
          };
        }
 
        // MAKE SEARCH
        if( state.searchTerm.length>0){
            tempFilter =  {
              ...tempFilter,
              
              data: {
                ...tempFilter?.data,
                
                technicians: state.searchTerm.length > 0 
                  ? tempFilter?.data?.technicians.filter(technician => 
                      technician.technician_name.toLowerCase().includes(state.searchTerm.toLowerCase())
                    )
                  : tempFilter?.data?.technicians
              }
            };
        }

        state.filteredItems = tempFilter;
          
      }

    },

    searchByName: (state, action) => {

      const query = action.payload.trim().toLowerCase();
      state.searchTerm = query;
    
      // run it
      // if (!query) { } 
      // state.filteredItems = {
      //   ...state.dataAnalise,
      //   data: {
      //     ...state.dataAnalise?.data,
      //     technicians: 
      //     // filter here
      //     state.filteredItems = state.dataAnalise?.data?.technicians.filter(technician => 
      //     technician.technician_name.toLowerCase().includes(query)  
      //     )
      //     // end of filter
      //   }
      // };

      analiseSlice.caseReducers.filterFinalHandler(state, { });
    },

    // Filter
    filterBySector: (state, action) =>   {
      const query = action.payload.trim().toLowerCase();
      state.sectorFilter = query;

      analiseSlice.caseReducers.filterFinalHandler(state, { });
    },

    
    filterByArea: (state, action) =>  {
      const query = action.payload.trim().toLowerCase();
      state.areaFilter = query;
      
      analiseSlice.caseReducers.filterFinalHandler(state, { });
    },

    clearAreaData: (state, action) =>  {
      state.areaFilter='';
      // state.dataArea=[];
      
      analiseSlice.caseReducers.filterFinalHandler(state, { });
    },

    nullAreaData: (state, action) =>  {
      state.areaFilter='';
      state.dataArea=[];
      
      analiseSlice.caseReducers.filterFinalHandler(state, { });
    },

    clearSectorData: (state, action) => {
      state.sectorFilter=''; 
      state.areaFilter='';
      
      analiseSlice.caseReducers.filterFinalHandler(state, { });
    }
    
  },
  extraReducers: (builder) => {
    builder
    // control GLOBAL DATA
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
      })
      // control SECTORS
      .addCase(fetchSector.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSector = action.payload;
      })
      // control AREAD
      .addCase(fetchArea.fulfilled, (state, action) => {
        state.loading = false;
        state.dataArea = action.payload;
      })
  
  },
});

export const { searchByName, filterBySector,
   filterByArea, clearAreaData, nullAreaData, clearSectorData } = analiseSlice.actions;
export default analiseSlice.reducer;

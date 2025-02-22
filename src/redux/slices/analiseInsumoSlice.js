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

export const fetchInsumo = createAsyncThunk(
  "analise/fetchInsumo",
  async () => {
     const response = await api.get("/analytics/farm-inputs/23e9336a-b20a-4478-a58f-875cc065e871?offset=1&limit=10?&filter=&phase=nurseries");
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


const analiseInsumo = createSlice({
  name: "analiseInsumo",
  initialState: {
    
    dataInsumo: [],

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

      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    // Filter
    filterBySector: (state, action) =>   {
      const query = action.payload.trim().toLowerCase();
      state.sectorFilter = query;

      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    
    filterByArea: (state, action) =>  {
      const query = action.payload.trim().toLowerCase();
      state.areaFilter = query;
      
      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    clearAreaData: (state, action) =>  {
      state.areaFilter='';
      // state.dataArea=[];
      
      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    nullAreaData: (state, action) =>  {
      state.areaFilter='';
      state.dataArea=[];
      
      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    clearSectorData: (state, action) => {
      state.sectorFilter=''; 
      state.areaFilter='';
      
      analiseInsumo.caseReducers.filterFinalHandler(state, { });
    },

    // INSUMOS REDUCERS -----------------------------------
    filterInsumoBySector: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      state.sectorFilter = query;
      analiseInsumo.caseReducers.filterInsumoFinalHandler(state, { });
    },    
    filterInsumoByArea: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      state.areaFilter = query;
      // analiseInsumo.caseReducers.filterInsumoFinalHandler(state, { });
    },
    // Final Insumo Handler
    filterInsumoFinalHandler: (state, action) => {
      
      if(
         state.sectorFilter.length > 0 
        // || state.areaFilter.length > 0
       ){

        let tempFilter = state.dataInsumo;

        // FILTER SECTORS
        if (state.sectorFilter.length > 0) {
          tempFilter = {
            ...tempFilter,
            data: {
              ...tempFilter.data,
              sectors: tempFilter?.data.sectors?.filter(record =>
                record.name?.toLowerCase().includes(state.sectorFilter.toLowerCase())
              )
            }
            ,
          };
        }
        
        

        // FILTER AREAS
        if (state.areaFilter.length > 0) {
          // Awaiting API Endpoint for this....
        }

        // console.log(tempFilter);
        state.filteredItems = tempFilter;
          
      }

    },
    
  },
  extraReducers: (builder) => {
    builder
    // ANALISE ---------
    // control GLOBAL DATA ANALISE
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

      // INSUMO --------------------
      // control GLOBAL DATA INSUMO
      .addCase(fetchInsumo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsumo.fulfilled, (state, action) => {
        state.loading = false;
        state.dataInsumo = action.payload;
      })
      .addCase(fetchInsumo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  },
});

export const { 
       searchByName,filterBySector, filterByArea, 
       clearAreaData, nullAreaData, clearSectorData,
       filterInsumoBySector, filterInsumoByArea 
      } = analiseInsumo.actions;

export default analiseInsumo.reducer;

import InsumoTable from "../components/insumoTable";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchInsumo, fetchSector, fetchArea, 
    clearAreaData, nullAreaData, clearSectorData,
    filterInsumoBySector, filterInsumoByArea
    } from "../redux/slices/analiseInsumoSlice";

const InsumosPage = () => {

  const dispatch = useDispatch();
  const { 
    dataInsumo, filteredItems, 
    dataSector, dataArea,
    loading, error 
    } = useSelector((state) => state.analiseInsumo);
 
  const [sectorFilter, setSectorFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [selectedSectorID, setSectorID] = useState("");
  
  const filteredDataInsumo =  sectorFilter || areaFilter 
                                ? filteredItems : dataInsumo;

    useEffect(() => {
        dispatch(fetchInsumo()).then(() => {
          // load sectors data
          dispatch(fetchSector());
        });
      }, [dispatch]);

 
  // SECTOR HANDLE
  const handleSectorChange = (e) =>{
    const value = e.target.value; 
    setAreaFilter('');

    if(value && value!='cancel'){
        const selectedOption = e.target.selectedOptions[0];  
        const sectorID = selectedOption.getAttribute("data-key");
        setSectorID(sectorID);
        
        dispatch(clearAreaData(value));

        dispatch(filterInsumoBySector(value)); 
        dispatch(fetchArea(sectorID))
        setSectorFilter(value); 

    } else {
        setSectorFilter('');
    }

    if(value=='cancel'){
        dispatch(clearAreaData(value));
        dispatch(nullAreaData(value));
        dispatch(clearSectorData(value));
    }
    
  }

  // AREA HANDLE
  const handleAreaChange = (e) =>{
    const value = e.target.value;

    if(value && value!='cancel'){
        dispatch(filterInsumoByArea(value)); 
        setAreaFilter(value);
        // console.log(dataSector.data.data[0]);
    } else {
        setAreaFilter('');
    }

    if(value=='cancel'){
        // Awaiting API Endpoint 
        // dispatch(clearAreaData(value));
    }
  }

  return (
    <div className="page-container">
     
     <h1 className="text-left">Insumos</h1>

     <div className="scope-page-insumos">
 
    <div className="w-100 mt-3 mb-2">

     <div className="w-100 pt-5">
      <div className="container">
        <div className="col-12 col-md-11 mx-auto">

        <div className="row">
        
        <div className="col-6 d-flex items-center center-items">
        <h4 className="text-left  mb-1">Distribuição Viveiros</h4>
            </div>
    
            <div className="col-3 ml-auto text-right">    
                <select className="form-control bg-dark text-light dark-input"
                value={sectorFilter} onChange={handleSectorChange} >
                    <option disabled value={""} >Selecione o sector</option>

                { dataSector?.data?.data?.map( (sector) => (
                <option data-key={sector.id} key={sector.id}
                         value={sector.name} >{sector.name}</option>   
                )
                )}

                    <option value={"cancel"}>TUDO</option>
                </select>
             </div>
    
            <div className="col-3">    
                <select className="form-control bg-dark text-light dark-input"
                value={areaFilter} onChange={handleAreaChange} >
                <option disabled value={""} >Selecione a ârea</option>

                { dataArea?.data?.map( (area) => (
                <option key={area.id} value={area.name}>{area.name}</option>   
                )
                )}

                <option value={"cancel"}>TUDO</option>
                </select>
            </div>
    
        </div>


        </div>
      </div>
     </div>
        
        </div>
        {
            (loading)?
            <p>Loading...</p>
            : (
                (error)?
                <p>Error: {error}</p>
                : 
                <InsumoTable 
                dataFilter={filteredDataInsumo}  />
            )
        }
      
     </div>
    </div>
  );
};

export default InsumosPage;

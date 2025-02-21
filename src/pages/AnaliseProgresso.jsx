import AnaliseTable from "../components/analiseTable";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
     fetchAnalise, fetchSector, fetchArea, searchByName, 
     filterBySector , filterByArea, clearAreaData, nullAreaData, clearSectorData
    } from "../redux/slices/analiseSlice";

const AnaliseProgresso = () => {

  const dispatch = useDispatch();
  const { 
    dataAnalise, filteredItems, 
    dataSector, dataArea,
    loading, error 
    } = useSelector((state) => state.analise);

  const [searchAnalise, setSearchAnalise] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [selectedSectorID, setSectorID] = useState("");
  
  const filteredDataAnalise =  searchAnalise || sectorFilter || areaFilter 
                                ? filteredItems : dataAnalise;

    useEffect(() => {
        dispatch(fetchAnalise()).then(() => {
          // load sectors data
          dispatch(fetchSector())
        });
      }, [dispatch]);

  // SEARCH HANDLE
  const handleSearchChange = (e) => {
    const value = e.target.value;

        setSearchAnalise(value);
        dispatch(searchByName(value)); 
  };

  // SECTOR HANDLE
  const handleSectorChange = (e) =>{
    const value = e.target.value; 
    setAreaFilter('');

    if(value && value!='cancel'){
        const selectedOption = e.target.selectedOptions[0];  
        const sectorID = selectedOption.getAttribute("data-key");
        setSectorID(sectorID);
        
        dispatch(clearAreaData(value));

        dispatch(filterBySector(value)); 
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
        dispatch(filterByArea(value)); 
        setAreaFilter(value);
        // console.log(dataSector.data.data[0]);
    } else {
        setAreaFilter('');
    }

    if(value=='cancel'){
        dispatch(clearAreaData(value));
    }
  }

  return (
    <div className="page-container">
      <h1 className="text-left">Análises - Progresso</h1>

    <div className="w-100 mt-3">

        <div className="row">
        
        <div className="col-3">
            <input
            type="text"
            placeholder="Pesquisar por..."
            className="form-control bg-dark text-light dark-input"
            value={searchAnalise}
            onChange={handleSearchChange}
            />
            </div>
    
            <div className="col-3">    
                <select className="form-control bg-dark text-light dark-input"
                value={sectorFilter} onChange={handleSectorChange} >
                    <option disabled value={""} selected>Selecione o sector</option>

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
                <option disabled value={""} selected>Selecione a ârea</option>

                { dataArea?.data?.map( (area) => (
                <option key={area.id} value={area.name}>{area.name}</option>   
                )
                )}

                <option value={"cancel"}>TUDO</option>
                </select>
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
                <AnaliseTable 
                dataFilter={filteredDataAnalise}  />
            )
        }
      
    </div>
  );
};

export default AnaliseProgresso;

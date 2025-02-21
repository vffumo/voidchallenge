import AnaliseTable from "../components/analiseTable";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
     fetchAnalise, fetchSector, fetchArea,
     searchByName 
    } from "../redux/slices/analiseSlice";

const AnaliseProgresso = () => {

  const dispatch = useDispatch();
  const { 
    dataAnalise, filteredItems, 
    dataSector, dataArea,
    loading, error 
    } = useSelector((state) => state.analise);

  const [searchAnalise, setSearchAnalise] = useState("");
  
    const filteredDataAnalise = 
    searchAnalise
    ?
    filteredItems
    :
    dataAnalise;
  

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

  useEffect(() => {
    // setSearchAnalise(searchAnalise); // Update local state when Redux state changes
  }, [searchAnalise]);
  
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
            {dataSector &&
            <select 
            className="form-control bg-dark text-light dark-input"> 
            {/* // value={selectedFilter} onChange={handleSelectChange} */}
            <option disabled selected>Selecione o sector</option>
            <option value="">- Nenhum</option>
    
            { dataSector?.data?.map( (sector, index) => (
             <option key={sector.id} value={sector.name}>{sector}</option>   
            )
            )}

            </select>
            }

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

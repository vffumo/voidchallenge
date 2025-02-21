import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalise } from "../redux/slices/analiseSlice";
import { Table, Container } from "react-bootstrap";
import { data } from "react-router-dom";

const AnaliseTable = () => {
  const dispatch = useDispatch();
  const { dataAnalise, loading, error } = useSelector((state) => state.analise);
  let count= 0;
  
  // const [searchAnalise, setSearchAnalise] = useState("");

  // const filteredTechnicians = 
  // searchTerm
  //   ?
  //   dataAnalise?.data?.technicians?.filter((record) =>
  //   record.technician_name.toLowerCase().includes(searchAnalise.toLowerCase()) )
  //   :
  //   : dataAnalise?.data?.technicians;

  useEffect(() => {
    dispatch(fetchAnalise());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(dataAnalise);
  return (
    <>

    <div className="w-100 mt-3">

    <div className="row">
      
      <div className="col-3">
        <input
          type="text"
          placeholder="pesquisar por..."
          className="form-control bg-dark text-light dark-input"
          // value={searchAnalise}
          // onChange={(e) => setSearchAnalise(e.target.value)}
        />
        </div>
  
        <div className="col-3">
        <select 
          className="form-control bg-dark text-light dark-input">
        {/* // value={selectedFilter} onChange={handleSelectChange} */}
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        </div>
  
      </div>
      
    </div>

    <div className="table-container mt-3 bordered styled-table-scope">
      <Table  hover responsive  className="table-dark  overflow-hidden border-width-1 styled-table">
        <thead className="">
          <tr>
            <th>SECTOR</th>
            <th>ÂREA</th>
            <th>TÉCNICO</th>
            {dataAnalise?.data?.weeksList?.length > 0 &&
              Object.keys(dataAnalise.data.weeksList).map((week, index) => (
                <th key={week}>SEMANA {index + 1}</th>
              ))
            }

              
          </tr>
        </thead>
        <tbody>
          
        {dataAnalise?.data?.technicians?.map((record, index) => (
  <tr key={record.week_start}>
    <td>{record.sector}</td>
    <td>{record.area_name}</td>
    <td>{record.technician_name}</td>

    {record.weeks?.map((week, index) => (
      <td key={index}>{week.total_records}</td>  
    ))}

  </tr>
))}


        </tbody>
      </Table>
    </div>
    
    </>
  );
};

export default AnaliseTable;

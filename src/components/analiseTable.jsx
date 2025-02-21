import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalise } from "../redux/slices/analiseSlice";
import { Table, Container } from "react-bootstrap";
// import { data } from "react-router-dom";

const AnaliseTable = ({ dataFilter }) => {

  const filteredDataAnalise = dataFilter;
  const [ sumTotal, setSumTotal] = useState([])

  // CALCULATE TOTAL
  function calculateTotal() {
    let totalInner = [];
    filteredDataAnalise?.data?.technicians?.forEach((record) => {

    let countSingleTasks = 0;
      // Loop > weeks
      record.weeks?.forEach((week, indexWeek) => {
        countSingleTasks += week.total_records; 
        // Check if the 'week' exists
        if (!totalInner[indexWeek]) {
          totalInner[indexWeek] = { start: week.total_records, final: countSingleTasks }; 
          //  Ya.. Initialze the week
        }
  
        // Update da start and final values
        totalInner[indexWeek].start += week.total_records;
        totalInner[indexWeek].final += countSingleTasks; // Only add for the current week
      });
    });
  
    // Update state with new totalInner
    setSumTotal(totalInner);
    // console.log(totalInner); 
  }
  
  useEffect(() => {
    calculateTotal();
  }, [filteredDataAnalise]); // Trigger when filteredDataAnalise changes
 
  return (
    <>

    <div className="table-container mt-3 bordered styled-table-scope">
      <Table  hover responsive  className="table-dark  overflow-hidden border-width-1 styled-table mb-0">
        <thead className="">
          <tr>
            <th>SECTOR</th>
            <th>ÂREA</th>
            <th>TÉCNICO</th>
            {filteredDataAnalise?.data?.weeksList?.length > 0 &&
              Object.keys(filteredDataAnalise.data.weeksList).map((week, index) => (
                <th key={week}>SEMANA {index + 1}</th>
              ))
            }

              
          </tr>
        </thead>
        <tbody>
          
        {filteredDataAnalise?.data?.technicians?.map((record, index) => {
          let countSingleTasks =0;
          return (
            <tr key={record.week_start}>
              <td >{record.sector}</td>
              <td>{record.area_name}</td>
              <td>{record.technician_name}</td>
          
              {record.weeks?.map((week, index) => {
                
                countSingleTasks+=week.total_records;
      
                return (
                  <td key={index}>{week.total_records} <span className="divider-item">|</span> <strong>{countSingleTasks}</strong></td>  
                );
              })}
          
            </tr>
          );

        })}
 

        {/* Total Calcule */}
        <tr >
          <td colSpan={3} className="text-right">
            <strong className="text-right">Totais</strong>
          </td>

          {
            sumTotal?.map((calc, index) => {
              return(
                <td key={`total${index}`}>{calc.start} <span className="divider-item">|</span> <strong>{calc.final}</strong></td> 
              );
            })
          }
        </tr>

        </tbody>
      </Table>
    </div>
    
    </>
  );
};

export default AnaliseTable;

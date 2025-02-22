import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
// import { data } from "react-router-dom";

const InsumoTable = ({ dataFilter }) => {

  const filteredDataInsumo = dataFilter;
  const [ sumTotal, setSumTotal] = useState([]);
  const [ totalFarmers, setTotalFarmers] = useState(0);

  function calculateTotal() {
    let totalInner = [];
    let totalFarmersInner= 0;
    filteredDataInsumo?.data?.sectors?.forEach((record) => {
     
      totalFarmersInner+= record.totalFarmers;
      // Loop > packs
      record.packages?.forEach((pack, indexPack) => { 
        // Check if the 'pack' exists
        if (!totalInner[indexPack]) {
          totalInner[indexPack] = { 
            received: parseFloat(pack.received) || 0, 
            sent: parseFloat(pack.sent) || 0 }; 
          //  Ya.. Initialze the pack
        } else {
  
        // Update da start and final values
        totalInner[indexPack].received += parseFloat(pack.received) ||0;
        totalInner[indexPack].sent += parseFloat(pack.sent) ||0;
        }
      });
    });
  
    // Update state with new totalInner
    setSumTotal(totalInner); 
    setTotalFarmers(totalFarmersInner);
  }
  
  useEffect(() => {
    calculateTotal(); 
  }, [filteredDataInsumo]);  
 
  // console.log(filteredDataInsumo);

  return (
    <>

    <div className="table-container mt-3 bordered styled-table-scope styled-table-scope-insumos ">
      <Table  hover responsive  className="table-dark  overflow-hidden border-width-1 styled-table mb-0">
        <thead className="">
          <tr>
            <th>SECTOR</th>
            <th>ÂREA</th>
            <th>TÉCNICO</th>
            <th>PRODUTORES</th>
            {filteredDataInsumo?.data?.inputsColumns?.length > 0 &&
             filteredDataInsumo.data.inputsColumns.map((column, index) => (
              <th key={`col-typeins-${index}`} colSpan={2}> {column}</th>
              ))
            }   
          </tr>          
          
          <tr key={"header2"}>
            <th colSpan={4}  key={'da324'}></th> 
            {filteredDataInsumo?.data?.inputsColumns?.length > 0 &&
             filteredDataInsumo.data.inputsColumns.map((column, index) => (
               <>
               <th key={`ith${index}`} className="th-capital">Distribuídos</th>
               <th key={`ith1${index}`} className="th-capital">Recebidos</th>
               </>
              ))
            }   
          </tr>
        </thead>
        <tbody>
          
        {filteredDataInsumo?.data?.sectors?.map((record, index) => {
           
          return (
            <tr key={`sector-${record.name}`}>
              <td className="text-left"><strong>{record.name}</strong></td>
              <td><strong>-</strong></td>
              <td><strong>-</strong></td>
              <td>{record.totalFarmers}</td>
          
              {record.packages?.map((pack, index) => {
                return (
                  <>
                      <td key={`sent-${pack.id}`}>{pack.sent}</td>
                      <td key={`received-${pack.id}`}>{pack.received}</td>
                  </>
                );
              })}
          
            </tr>
          );

        })}
 

        {/* Total Calcule */}
        <tr key={'last-row-stats'}>
          <td colSpan={3} className="text-center">
            <strong className="text-center">Totais</strong>
          </td>
          <td><strong>{totalFarmers}</strong></td>
          {
            sumTotal?.map((calc, index) => {
              return(
                <>
                  <td key={`totala${index}`}> <strong>{calc.sent.toFixed(2)} </strong> </td> 
                  <td key={`totalb${index}`}> <strong>{calc.received.toFixed(2)}</strong> </td> 
                </>
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

export default InsumoTable;

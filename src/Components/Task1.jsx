import { useState,useEffect } from "react";
import './Task1.css';
import React from 'react'

export default function Task1() {
    const[data,setd] = useState(null);
    const[group,setg] = useState(null);
    const [drop_d, setdrop] = useState(null);
    const[isopen,setopen] = useState(true);
    const handleClick = (asset) => {
      setopen(!isopen);
      if(isopen)
      {setdrop(asset);
      }
      else{
        setdrop(null);
      }
    };
    useEffect(()=>{
        async function fetch_d()
        {
           try{
            const response = await fetch('https://canopy-frontend-task.now.sh/api/holdings');
            const fetched_data = await response.json();
            setd(fetched_data);
            console.log(data);
           }
           catch(error)
           {
            console.error('Eroor in fetching data:',error);
           }
        }
        fetch_d();
    },[]);


useEffect(()=>{
    if(data && data.payload )
    {
        const group_data = data.payload.reduce((arr,idx) =>{
            const asset_class = idx.asset_class;
            if(!arr[asset_class])
            {
                arr[asset_class] = [];
            }
            arr[asset_class].push(idx);
            return arr;
        },{});
        setg(group_data);
    }
},[data]);


if (!group) {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  }


  return (
    <div >
     
      {Object.keys(group).map((asset,idx)=>(
        <div key  ={idx}>
          <div className="text">
            <button type="submit" onClick={() => handleClick(asset)}>{asset}</button>
           </div>
            {drop_d === asset && (
        <ul>
            <div className="table-wrapper">
            <table class="fl-table">
                <tr>
                    <th>Name of the Holding</th>
                    <th>Ticker</th>
                    <th>Average Price</th>
                    <th>market Price</th>
                    <th>Latest Change Percentage</th>
                    <th>Market Value in Base CCY</th>
                </tr>
           { group[asset].map((value,idx) => (
               <tr>
                
                <td>{value.name}</td>
                <td>{value.ticker}</td>
                <td>{value.avg_price}</td>
                <td>{value.market_price}</td>
                <td>{value.latest_chg_pct}</td>
                <td> {value.market_value_ccy}</td>
               </tr>
            ))
        }
        </table>
        </div>
        </ul>
            )}
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function Task() {
    const [data, setData] = useState(null);
    const [groupedData, setGroupedData] = useState(null);

        useEffect(() => {
          async function fetchData() {
            try {
              const response = await fetch('https://canopy-frontend-task.now.sh/api/holdings');
              const fetchedData = await response.json();
              setData(fetchedData);
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      
        
          fetchData(); 
        }, []); 
        useEffect(() => {
            if (data && data.payload) {
              const grouped = data.payload.reduce((acc, item) => {
                const assetClass = item.asset_class;
                if (!acc[assetClass]) {
                  acc[assetClass] = [];
                }
                acc[assetClass].push(item);
                return acc;
              }, {});
        
              setGroupedData(grouped);
            }
          }, [data]);
        if (!groupedData) {
          return <div>Loading...</div>;
        }
      
        return (
          <div>
             <h1>Grouped Data by Asset Class:</h1>
      {Object.keys(groupedData).map((assetClass, index) => (
        <div key={index}>
          <h2>{assetClass}</h2>
          <ul>
            {groupedData[assetClass].map((item, idx) => (
              <li key={idx}>
                <p>Name: {item.name}</p>
                <p>Average Price: {item.avg_price}</p>
                <p>Latest Change Percentage: {item.latest_chg_pct}</p>
                
              </li>
            ))}
          </ul>
        </div>
      ))}
          </div>
        );
}

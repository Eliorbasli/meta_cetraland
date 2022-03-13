import React, { useEffect, useState } from "react";

import RowOfLand from "./rowOfLand";
import Dashboard from "./pages/Dashboard";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
const Map = () => {
  const [map, setMap] = useState([]);
  const getMap = async () => {
    const rawResponse = await fetch("http://localhost:8080/land/map", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setMap(await rawResponse.json());
  };
  useEffect(() => {
    if (map.length === 0) {
      getMap();
    }
  }, []);
  return (
    <>
 <TransformWrapper>
        <TransformComponent>
    <div className="map">
      {map.map((row, index) => {
        return <RowOfLand key={index} row={row} />;
      })}
    </div>
    </TransformComponent>
      </TransformWrapper>
      
      <div className="board">
        <Dashboard />
      </div>
    </>
  );
};

export default Map;

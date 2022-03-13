import React, { useState, useEffect } from "react";
const cols = 50;
const rows = 50;
const randomGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2));
    }
    grid.push(row);
  }
  return grid;
};

const slotColor = (row, col) => {
  if (row > 10 && row < 15) {
    return "blue";
  } else if (true) return "white";
};

function Grid() {
  const [grid, setGrid] = useState();
  useEffect(() => {
    setGrid(randomGrid());
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                id={i + " " + k}
                style={{
                  width: 30,
                  height: 30,
                  border: "1px solid black",

                  backgroundColor: slotColor(i, k),
                }}
              />
            ))
          )}
      </div>
    </div>
  );
}

export default Grid;

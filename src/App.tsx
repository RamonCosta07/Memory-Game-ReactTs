import { useState } from "react";
import "./App.css";

interface TCell {
  row: number;
  column: number;
}

function App() {
  const [grid, setGrid] = useState([
    [1, 1, 9, 0],
    [3, 5, 2, 9],
    [2, 3, 0, 5],
  ]);

  const [isReveled, setIsReveled] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [firstItem, setFirstItem] = useState<TCell>();

  const handleSelector = (row: number, col: number): void => {
    if (isReveled[row][col]) return;
    const clickedNumber = grid[row][col];
    const newIsReveled = [...isReveled];
    newIsReveled[row][col] = true;
    setIsReveled(newIsReveled);

    if (firstItem) {
      const firstItemChoosed = grid[firstItem.row][firstItem.column];
      if (firstItemChoosed !== clickedNumber) {
        setTimeout(() => {
          newIsReveled[firstItem.row][firstItem.column] = false;
          newIsReveled[row][col] = false;
          setIsReveled([...newIsReveled]);
        }, 750);
      } else {
        const won = isReveled.flat().every((state) => state === true);
        if (won) {
          setInterval(() => {
            alert(`Parabéns você ganhou!`);
          }, 500);
        }
      }
      setFirstItem(undefined);
    } else {
      setFirstItem({
        row: row,
        column: col,
      });
    }
  };

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((number, colIndex) => (
              <div
                className={
                  "card " + (isReveled[rowIndex][colIndex] ? "clicked" : "")
                }
                key={colIndex}
                onClick={() => handleSelector(rowIndex, colIndex)}
              >
                {isReveled[rowIndex][colIndex] ? number : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

const VALID_OPERATIONS = ["+", "-", "*", "/"];

function isValid<T>(val: T): boolean {
  return !Number.isNaN(Number(val)) && val !== "";
}

function App() {
  const [grid, setGrid] = useState<string[]>(new Array(100).fill(""));
  const [newValue, setNewValue] = useState<[number, string]>([-1, ""]);

  const handleChangeCell = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const [position, _] = newValue;

    setNewValue(() => {
      if (position === index) {
        return [position, value];
      }

      return [index, value];
    });
  };

  const handleSubmit = (index: number) => {
    if (index < 0 || index >= grid.length) {
      return;
    }

    const [_, currVal] = newValue;
    const isFormula = currVal[0] === "=";
    let resultValue = "";

    if (isFormula) {
      const computedValue = computeFormula(currVal, grid);
      resultValue = computedValue;
    } else {
      resultValue = currVal;
    }

    const newGrid = [...grid];
    newGrid[index] = resultValue;
    setGrid(newGrid);
    setNewValue([-1, ""]);
  };

  function computeFormula(formula: string, grid: string[]): string {
    const trimmedFormula = formula.slice(1).trim();
    const terms = trimmedFormula.split(/([+\-*/])/).map((term) => term.trim());

    const processedTerms = terms.map((term) => {
      if (term.startsWith("Cell")) {
        const index = parseInt(term.replace("Cell", ""), 10);
        return Number(grid[index]) || 0; // TODO: Confirm behaviour with product team/customer. Currently setting the value to 0 if not a number.
      } else if (VALID_OPERATIONS.includes(term)) {
        return term;
      } else {
        // treat as a valid number
        return parseInt(term, 10);
      }
    });

    let result = Number(processedTerms[0]);
    for (let i = 1; i < processedTerms.length; i += 2) {
      const operator = processedTerms[i];
      const nextValue = Number(processedTerms[i + 1]);
      if (operator === "+") {
        result += nextValue;
      } else if (operator === "-") {
        result -= nextValue;
      } else if (operator === "*") {
        result *= nextValue;
      } else if (operator === "/") {
        result /= nextValue;
      }
    }

    return isValid(result) ? String(result) : "";
  }

  return (
    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
      <h1>Excel prototype</h1>
      <div
        style={{
          textAlign: "left",
          border: "1px solid black",
          padding: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Instructions:</h2>
        <p>
          To interact with the grid, click on any cell and enter text or
          numbers. The grid also supports <b>formulas</b>. <br /> To use a
          formula, start with the equal sign <b>"="</b>.
          <br />
          The current operations are accepted for formulas: "+", "-", "*", "/".{" "}
          <br />
          Here are some examples of formulas you can use:
        </p>
        <ul>
          <li>=1+2 will return 3</li>
          <li>
            =Cell1 + Cell2 will compute the value of the cell at index 1 and the
            value at index 2
          </li>
          <li>=Cell10 - 100 will subtract 100 from the value at index 10</li>
        </ul>
        <p>
          <b>Notes:</b>
          <br />
          Any invalid operations will return an empty value.
        </p>
        <ul>
          <li>
            =Cell300 - 100 is invalid as the cell position 300 is out of bounds
          </li>
          <li>=someRandomText - 100 is invalid as it mixes text and numbers</li>
          <li>
            =CellX + CellY is invalid as it uses non-numeric values for cell
            positions
          </li>
        </ul>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 100px)",
          gridTemplateRows: "repeat(10, 100px)",
        }}
      >
        {grid.map((_, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <input
                style={{
                  border: "1px solid var(--black",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
                type="text"
                aria-label={`submit value for cell ${index}`}
                aria-live="polite"
                value={newValue[0] === index ? newValue[1] : grid[index]}
                onChange={(e) => handleChangeCell(e, index)}
                onBlur={() => handleSubmit(index)}
              />
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  fontSize: "12px",
                  color: "var(--gray)",
                }}
              >
                {index}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

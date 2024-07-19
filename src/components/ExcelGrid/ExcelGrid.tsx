import { useState } from "react";
import { computeFormula } from "./utils";

export const ExcelGrid: React.FC<{ rows: number; cols: number }> = ({
  rows,
  cols,
}) => {
  const [grid, setGrid] = useState<string[]>(new Array(rows * cols).fill(""));
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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(100px, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
      }}
    >
      {grid.map((_, index) => {
        return (
          <Cell
            key={index}
            onChange={(e) => handleChangeCell(e, index)}
            onBlur={() => handleSubmit(index)}
            value={newValue[0] === index ? newValue[1] : grid[index]}
            index={index}
          />
        );
      })}
    </div>
  );
};

const Cell: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  index: number;
  value: string;
}> = ({ onChange, onBlur, index, value }) => {
  return (
    <div style={{ position: "relative" }}>
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
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
};

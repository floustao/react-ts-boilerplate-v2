export const ExcelInstructions: React.FC = () => {
  return (
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
        To interact with the grid, click on any cell and enter text or numbers.
        The grid also supports <b>formulas</b>. <br /> To use a formula, start
        with the equal sign <b>"="</b>.
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
  );
};

import "./App.css";
import { ExcelInstructions } from "./components/ExcelInstructions";
import { ExcelGrid } from "./components/ExcelGrid";
import { FollowUp } from "./components/FollowUp";

function App() {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexDirection: "column",
        placeContent: "center",
      }}
    >
      <h1>Excel prototype</h1>
      <ExcelInstructions />
      <ExcelGrid rows={10} cols={10} />
      <FollowUp />
    </div>
  );
}

export default App;

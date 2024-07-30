import "./App.css";
import { UserComparator } from "./components/UserComparator";

function App() {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        width: "100%",
        maxWidth: "800px",
        height: "100vh",
      }}
    >
      <h1>Mercury user matching</h1>
      <UserComparator />
    </div>
  );
}

export default App;

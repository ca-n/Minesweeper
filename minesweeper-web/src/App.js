import './App.css';
import Minesweeper from "./components/Minesweeper";

function App() {
  return (
    <div className="App">
      <Minesweeper cols={16} rows={16} mines={30}/>
    </div>
  );
}

export default App;

import './App.css';
import Minesweeper from "./components/Minesweeper";

function App() {
  return (
    <div className="App">
      <Minesweeper cols={10} rows={10} mines={20}/>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Minesweeper from "./components/Minesweeper";
import Flag from './components/cells/Flag';
import Mine from './components/cells/Mine';
import NoMine from './components/cells/NoMine';
import Revealed from './components/cells/Revealed';

function App() {
  return (
    <div className="App">
      <Minesweeper cols={10} rows={10} mines={20}/>
      <Flag />
      <Mine />
      <NoMine />
      <Revealed adjacentMines='1' />
      <Revealed adjacentMines='2' />
      <Revealed adjacentMines='3' />
      <Revealed adjacentMines='4' />
      <Revealed adjacentMines='5' />
      <Revealed adjacentMines='6' />
      <Revealed adjacentMines='7' />
      <Revealed adjacentMines='8' />
    </div>
  );
}

export default App;

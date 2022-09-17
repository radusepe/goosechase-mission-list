import "./App.css";
import { Controls } from "./components/Controls";
import { Missions } from "./components/Mission";
import { useMissions } from "./hooks/useMissions";

function App() {
  const { missions, isSortedByName, onChangeSortByName } = useMissions();

  return (
    <div className="App">
      <Controls isSorted={isSortedByName} onChangeSort={onChangeSortByName} />
      <Missions missions={missions} />
    </div>
  );
}

export default App;

import "./App.css";
import { Controls } from "./components/Controls";
import { Missions } from "./components/Mission";
import { useMissions } from "./hooks/useMissions";

function App() {
  const {
    missions,
    isSortedByName,
    onChangeSortByName,
    filters,
    onChangeFilter,
    onNext,
    onPrev,
  } = useMissions();

  return (
    <div className="App">
      <Controls
        isSorted={isSortedByName}
        onChangeSort={onChangeSortByName}
        filters={filters}
        onChangeFilter={onChangeFilter}
        onNext={onNext}
        onPrev={onPrev}
      />
      <Missions missions={missions} />
    </div>
  );
}

export default App;

import "./App.css";
import { Arrangement, ArrangementContextProvider } from "./modules/arrangement";
import { grid_count, grid_pixel } from "./modules/audiolib/options";

// TODO: some style are inlined (...)
function Context({ children }) {
  return (
    <ArrangementContextProvider
      gridPixel={grid_pixel}
      defaultGridCount={grid_count}
      beatsPerMeasure={
        6 /* TODO: This should be calculated from the time signature */
      }
    >
      {children}
    </ArrangementContextProvider>
  );
}

function App() {
  return (
    <Context>
      <div className="app">
        <Arrangement />
      </div>
    </Context>
  );
}

export default App;

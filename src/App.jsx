import "./App.css";
import { Arrangement, ArrangementContextProvider } from "./modules/arrangement";

// TODO: some style are inlined (...)
function Context({ children }) {
  return (
    <ArrangementContextProvider
      gridPixel={100}
      gridCount={300}
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

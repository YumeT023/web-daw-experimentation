import "./App.css";
import { Arrangement, ArrangementCtxProvider } from "./modules/arrangement";

// TODO: some style are inlined (...)
function Ctx({ children }) {
  return (
    <ArrangementCtxProvider
      gridPixel={100}
      gridCount={200}
      beatsPerMeasure={
        6 /* TODO: This should be calculated from the time signature */
      }
    >
      {children}
    </ArrangementCtxProvider>
  );
}

function App() {
  return (
    <Ctx>
      <div className="app">
        <Arrangement />
      </div>
    </Ctx>
  );
}

export default App;

import "./App.css";
import { Arrangement, ArrangementCtxProvider } from "./modules/arrangement";

function Ctx({ children }) {
  return (
    <ArrangementCtxProvider gridPixel={76} gridCount={200}>
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

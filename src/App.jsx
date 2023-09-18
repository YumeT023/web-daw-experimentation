import "./App.css";
import { Arrangement, ArrangementContextProvider } from "./modules/arrangement";
import { grid_count, grid_pixel } from "./modules/audiolib/options";
import { useRef } from "react";
import { AudioController } from "./modules/audiolib/AudioController";

// TODO: some style are inlined (...)
function Context({ children }) {
  return (
    <ArrangementContextProvider
      gridPixel={grid_pixel}
      gridCount={grid_count}
      beatsPerMeasure={
        6 /* TODO: This should be calculated from the time signature */
      }
    >
      {children}
    </ArrangementContextProvider>
  );
}

// TODO: remove this
function TestScheduleAudio() {
  const ref = useRef(new AudioController());
  const playAtInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const loadBlobIntoWavesurfer = async (blob) => {
    const buffer = await blob.arrayBuffer();
    await ref.current.loadArrayBuffer(buffer);
  };

  const loadAudio = (e) => {
    const items = e.target.files;
    if (items && items.length) {
      const file = items.item(0);
      loadBlobIntoWavesurfer(file);
      e.target.value = ""; // This is done so that I can import the same media twice
    }
  };

  const playAt = () => {
    const seconds = Number(playAtInputRef.current.value);
    const time = Number(timeInputRef.current.value);
    ref.current.schedulePbAt(seconds, time);
  };

  const playNow = () => {
    const time = Number(timeInputRef.current.value);
    ref.current.play(time);
  };

  return (
    <div style={{ color: "#fff" }}>
      <div>
        when
        <input type="number" ref={playAtInputRef} />
        time
        <input type="number" ref={timeInputRef} />
      </div>

      <button onClick={playAt}>play at time</button>
      <button onClick={playNow}>play now</button>
      <button onClick={() => ref.current.stop()}>stop</button>
      <button onClick={() => ref.current.pause()}>pause</button>
      <button onClick={() => ref.current.resume()}>resume</button>

      <input
        type="file"
        id="import-file"
        accept="audio/*"
        onChange={loadAudio}
      />
    </div>
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

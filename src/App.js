import './App.css';
import Settings from './Settings';
import Timer from './Timer';
import { useState } from 'react';
import SettingsContext from './SettingsContext';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortMinutes, setShortMinutes] = useState(5);
  const [longMinutes, setLongMinutes] = useState(20);

  return (
    <main>
    {/* Allows us to use the following variables in Settings.js and Timer.js */}
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        shortMinutes,
        longMinutes,
        setWorkMinutes,
        setShortMinutes,
        setLongMinutes
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;

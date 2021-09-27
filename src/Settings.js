import { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return (
        <div style={{ textAlign: 'left' }}>
            <label>Work: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
                className={'slider work'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                min={1}
                max={60}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}:00</div>}
            />
            <label>Short Break: {settingsInfo.shortMinutes}:00</label>
            <ReactSlider
                className={'slider short'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.shortMinutes}
                onChange={newValue => settingsInfo.setShortMinutes(newValue)}
                min={1}
                max={60}
            />
            <label>Long Break: {settingsInfo.longMinutes}:00</label>
            <ReactSlider
                className={'slider long'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.longMinutes}
                onChange={newValue => settingsInfo.setLongMinutes(newValue)}
                min={1}
                max={60}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>
    );
}

export default Settings;
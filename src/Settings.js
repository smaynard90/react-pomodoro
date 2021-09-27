import { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return (
        <div style={{ textAlign: 'left' }}>
            <label>Work: {settingsInfo.workMinutes} minute(s)</label>
            <ReactSlider
                className={'slider work'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={60}
            />
            <label>Short Break: {settingsInfo.shortMinutes} minute(s)</label>
            <ReactSlider
                className={'slider short'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.shortMinutes}
                onChange={newValue => settingsInfo.setShortMinutes(newValue)}
                min={1}
                max={60}
            />
            <label>Long Break: {settingsInfo.longMinutes} minute(s)</label>
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
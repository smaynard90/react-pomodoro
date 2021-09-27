import { useContext, useEffect, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

function Timer() {

    const red = '#FF0000';
    const yellow = '#FFFF00';
    const green = '#008000';

    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [counter, setCounter] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const counterRef = useRef(counter);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode() {
            let nextMode;

            if (modeRef.current === 'work' & counterRef.current > 3) {
                nextMode = 'long';
            } else {
                (modeRef.current === 'work')
                    ? nextMode = 'short'
                    : nextMode = 'work';
            }

            let nextSeconds;
            switch (nextMode) {
                case 'work':
                    nextSeconds = settingsInfo.workMinutes * 60;
                    break;

                case 'short':
                    nextSeconds = settingsInfo.shortMinutes * 60;
                    break;

                case 'long':
                    nextSeconds = settingsInfo.longMinutes * 60;
                    break;

                default:
                    break;
            }

            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                if (modeRef.current === 'work') {
                    counterRef.current++;
                    setCounter(counterRef.current);
                }
                if (modeRef.current === 'long') {
                    counterRef.current = 0;
                    setCounter(counterRef.current);
                }
                return switchMode();
            }

            tick();
            console.log(counterRef.current);
        }, 5);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    // Sets timer based on settings
    let totalSeconds;
    switch (mode) {
        case 'work':
            totalSeconds = settingsInfo.workMinutes * 60;
            break;

        case 'short':
            totalSeconds = settingsInfo.shortMinutes * 60;
            break;

        case 'long':
            totalSeconds = settingsInfo.longMinutes * 60;
            break;

        default:
            break;
    }

    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    // Sets timer color
    let timerColor;
    switch (mode) {
        case 'work':
            timerColor = red;
            break;

        case 'short':
            timerColor = yellow;
            break;

        case 'long':
            timerColor = green;
            break;

        default:
            break;
    }

    return (
        <div>
            <div className='progress' >
                <CircularProgressbar
                    value={percentage}
                    text={<tspan dx={-19} dy={5}>{minutes + ':' + seconds}</tspan>}
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: timerColor,
                        tailColor: 'rgba(255,255,255,.2)'
                    })} />
            </div>
            <div style={{ marginTop: '20px' }}>
                {isPaused
                    ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
                    : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
            </div>
            <div style={{ marginTop: '20px' }}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;
import { useState, useEffect } from 'react';

const Clock = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);
	const [timerLabel, setTimerLabel] = useState('Session');
	const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
	const [isRunning, setIsRunning] = useState(false);

	const handleBreakInc = () => {
		setBreakLength(breakLength + 1);
	};

	const handleBreakDec = () => {
		setBreakLength(Math.max(breakLength - 1, 1));
	};

	const handleSessionInc = () => {
		setSessionLength(sessionLength + 1);
		handleTimer(sessionLength + 1);
	};

	const handleSessionDec = () => {
		setSessionLength(Math.max(sessionLength - 1, 1));
		handleTimer(sessionLength - 1);
	};

	const handleTimer = (session) => {
		setTimeLeft(session * 60);
	};

	const handleStartStop = () => {
		setIsRunning(!isRunning);
	};

	const handleReset = () => {
		setBreakLength(5);
		setSessionLength(25);
		setTimerLabel('Session');
		setTimeLeft(25 * 60);
		setIsRunning(false);
	};

	useEffect(() => {
		let intervalId;

		if (isRunning) {
			intervalId = setInterval(() => {
				setTimeLeft((prevTimeLeft) => {
					if (prevTimeLeft === 0) {
						if (timerLabel === 'Session') {
							setTimerLabel('Break');
							return breakLength * 60;
						} else {
							setTimerLabel('Session');
							return sessionLength * 60;
						}
					} else {
						return prevTimeLeft - 1;
					}
				});
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [isRunning, breakLength, sessionLength, timerLabel]);

	return (
		<div className="clock">
			<div className="controllers">
				<div className="break">
					<div className="break-label">Break Length</div>
					<div className="break-length">{breakLength}</div>
					<button className="break-increment" onClick={handleBreakInc}>
						+
					</button>
					<button className="break-decrement" onClick={handleBreakDec}>
						-
					</button>
				</div>
				<div className="session">
					<div className="session-label">Session Length</div>
					<div className="session-length">{sessionLength}</div>
					<button className="session-increment" onClick={handleSessionInc}>
						+
					</button>
					<button className="session-decrement" onClick={handleSessionDec}>
						-
					</button>
				</div>
			</div>
			<div className="timer">
				<div className="timer-label">{timerLabel}</div>
				<div className="time-left">
					{Math.floor(timeLeft / 60)
						.toString()
						.padStart(2, '0')}
					:{(timeLeft % 60).toString().padStart(2, '0')}
				</div>
				<button className="start-stop" onClick={handleStartStop}>
					{isRunning ? 'Stop' : 'Start'}
				</button>
				<button className="reset" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Clock;

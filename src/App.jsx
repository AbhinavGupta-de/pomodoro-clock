import Clock from './Clock';
import './styles.css';

const App = () => {
	return (
		<div className="App">
			<div className="container">
				<h1>Pomodoro Clock</h1>
				<Clock />
			</div>
		</div>
	);
};

export default App;

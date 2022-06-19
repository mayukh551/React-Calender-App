import Grid from "./Components/Grid";
import Header from "./Components/Header";
import Week from "./Components/Week";

function App() {
	return (
		<div className="h-screen overflow-hidden">
			<Header />
			<Week />
			<Grid />
		</div>
	);
}

export default App;

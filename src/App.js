import { BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Body from './components/Body';
import Store from './components/Store';

function App() {
	return (
		<Router>
			<NavBar />
			<div style={{minHeight:"400px", border:"solid 2px black", margin:"0 20px"}}>
				<Route path="/" exact component={Body} />
				<Route path="/store" component={Store} />
			</div>

		</Router>
	);
}

export default App;

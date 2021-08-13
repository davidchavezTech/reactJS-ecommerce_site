import { BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Body from './components/Body';
import Store from './components/Store';
import LogIn from './components/admin/login';
import AdminNavBar from './components/admin/AdminNavBar';
import CreateNewUserForm from './components/admin/CreateNewUserForm';

function App() {
	const subdomain = window.location.host.split('.')[0];

	if(subdomain === "admin"){
		return (
			<Router>
				<AdminNavBar />
				<div style={{minHeight:"400px", margin:"20px 40px"}}>
					<Route path="/" exact component={LogIn} />
					<Route path="/createUser" component={CreateNewUserForm} />
				</div>
			</Router>
		)
	}else{
		return (
			<Router>
				<NavBar />
				<div style={{minHeight:"400px", margin:"20px 40px"}}>
					<Route path="/" exact component={Body} />
					<Route path="/store" component={Store} />
				</div>
	
			</Router>
		);
	}
}

export default App;

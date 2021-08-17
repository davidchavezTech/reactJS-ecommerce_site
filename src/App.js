import { BrowserRouter as Router, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Body from './components/Body';
import Store from './components/Store';
import LogIn from './components/admin/LogIn';
import AdminNavBar from './components/admin/AdminNavBar';
import CreateNewUserForm from './components/admin/CreateNewUserForm';
import TestLogIn from './components/testLogin';

function App() {
	const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false)
	const handleLogIn = () => {
		//Activate AdminNav
		SetIsUserLoggedIn(true)
	}
	return (
		<Router>
			<NavBar isUserLoggedIn={isUserLoggedIn} />
			<div style={{minHeight:"400px", margin:"20px 40px"}}>
				<Route path="/" exact component={Body} />
				<Route path="/testLogIn" component={TestLogIn} />
				<Route path="/store" component={Store} />
				<Route path="/login" 
					render={(props) =>(
						<>
							<LogIn onLogIn={ handleLogIn } />
						</>
					)}
				/>
			</div>

		</Router>
	);
}

export default App;

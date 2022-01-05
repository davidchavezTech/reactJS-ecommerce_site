// import { serverAdress } from './globalVariables';

// import { Route, useHistory } from 'react-router-dom'
// import { useState } from 'react';

// import { useState, useEffect } from 'react';

// import axios from 'axios'
//components
// import NavBar from './components/NavBar';
// import NavBarAdmin from './components/admin/NavBarAdmin'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
// import Body from './components/Body';
import Store from './components/Store';
// import LogIn from './components/admin/LogIn';
import Admin from './components/admin/Admin'
//css
import GlobalStyle from './components/GlobalStyle';
import styles from './App.module.css'
import fonts from './fonts/Fonts.module.css'
import { Route } from 'react-router-dom';

function App() {
	// const history = useHistory()
	// const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false)
	
	// const path = window.location.pathname;
	// const admin = path.includes("admin");
	
	// (async () => {
	// 		const response = await axios({
	// 			method: "GET",
	// 			withCredentials: true,
	// 			url: `${serverAdress}/admin/authenticateUser`,
	// 		})
	// 		if(response.data === true) {
	// 			SetIsUserLoggedIn(true)

	// 			// history.push("/admin")
	// 		}else if(admin) history.push("/login")
	// 	}
	// )()

	
	return (
		<div className={`${styles.main_limiter} ${fonts.lemon_milk_reg}`}>
			{/* {admin ? <NavBarAdmin /> : <NavBar />} */}
			<Navbar />
			<Route path="/" exact component={Home} />
			<Route path="/store" exact component={Store} />
			

			{/*Admin routes*/}

			{/* <Route path="/login" component={LogIn}/> */}

			<Route path="/admin" 
				render={() => <Admin loggedIn={true} />}
			/>
			
			<GlobalStyle />
        </div>
		
	);
}

export default App;

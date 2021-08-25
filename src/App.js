import { Route} from 'react-router-dom'
import { useState } from 'react';
// import { useState, useEffect } from 'react';

// import axios from 'axios'
//components
import NavBar from './components/NavBar';
import AdminNavBar from './components/admin/AdminNavBar'
import Body from './components/Body';
import Store from './components/Store';
import LogIn from './components/admin/LogIn';
import Admin from './components/admin/Admin'
//css
import GlobalStyle from './components/GlobalStyle';



function App() {
	// const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false)
	const [isUserLoggedIn] = useState(false)
	
	const path = window.location.pathname;
	const admin = path.includes("admin")
	
	
    // const authenticateUser = async () => {
    //     const response = await axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "http://localhost:5000/admin/authenticateUser",
    //     })
    //     if(response.data === true) SetIsUserLoggedIn(true)
    //     else if(admin) window.location = "/login"
    // }
	// useEffect(()=>{
	// 	authenticateUser()
	// }, [])
	return (
		<>
			{admin ? <AdminNavBar /> : <NavBar />}
			
			<Route path="/" exact component={Body} />
			<Route path="/store" exact component={Store} />
			

			{/*Admin routes*/}

			<Route path="/login" component={LogIn}/>

			<Route path="/admin" 
				render={(props) => <Admin loggedIn={isUserLoggedIn} />}
			/>
			
			
			<GlobalStyle />
        </>
		
	);
}

export default App;

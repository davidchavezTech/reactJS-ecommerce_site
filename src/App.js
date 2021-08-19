import { Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
//components
import NavBar from './components/NavBar';
import AdminNavBar from './components/admin/AdminNavBar'
import Body from './components/Body';
import Store from './components/Store';
import LogIn from './components/admin/LogIn';
import Modal from './components/Modal';
import AdminStore from './components/admin/AdminStore';
import Admin from './components/admin/Admin'
//css
import GlobalStyle from './components/GlobalStyle';

const Button = styled.button`
	display:block;
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background:#141414;
    color:#fff;
    font-size:24px;
    cursor: pointer;
	margin-right:auto;
	margin-left:auto;
	margin-top:28px;
`


function App() {
	const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false)
	const [toggleModal, SetToggleModal] = useState(false);
	const [path, SetPath] = useState(window.location.pathname);
	const admin = path.includes("admin")
	const fireModal = () => SetToggleModal(prev => !prev);
	
    const authenticateUser = async () => {
        const response = await axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/admin/authenticateUser",
        })
        if(response.data === true) SetIsUserLoggedIn(true)
        else if(admin) window.location = "/login"
    }
	useEffect(()=>{
		authenticateUser()
	}, [])
	return (
		<>
			<Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
			{admin ? <AdminNavBar /> : <NavBar />}
			
			<Route path="/" exact component={Body} />
			

			{/*Admin routes*/}

			<Route path="/login" component={LogIn}/>

			<Route path="/admin"
				render={(props) => <Admin loggedIn={isUserLoggedIn} />}
			/>

			<Route path="/admin/store" 
				render={(props) => (
					<AdminStore isUserLoggedIn={ isUserLoggedIn } />
				)}
			/>
			<Button onClick={fireModal}>I'm a model</Button>
			

			<GlobalStyle />
        </>
		
	);
}

export default App;

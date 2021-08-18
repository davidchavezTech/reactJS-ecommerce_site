import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components'
//components
import NavBar from './components/NavBar';
import Body from './components/Body';
import Store from './components/Store';
import LogIn from './components/admin/LogIn';
import CreateNewUserForm from './components/admin/CreateNewUserForm';
import TestLogIn from './components/testLogin';
import Modal from './components/Modal';
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
	// const asd = useHistory();
	// console.log(asd)
	const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false)
	const [toggleModal, SetToggleModal] = useState(false);

	const fireModal = () => {
		SetToggleModal(prev => !prev);
	}
	const handleLogIn = () => {
		//Activate AdminNav
		SetIsUserLoggedIn(true)
	}

	// useEffect(()=>{
    //     authenticateUser()
    // },[])
	const listOfRedirectURLs = ["/login"]
	const location = window.location.pathname
	// if (listOfRedirectURLs.indexOf(location) !== -1) useHistory().push('/');
    // const authenticateUser = async () => {
    //     const response = await axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "http://localhost:5000/users/authenticateUser",
    //     })
    //     if(response.data === true) {
    //         SetIsUserLoggedIn(true)
    //         // history.push('/');
    //     } else console.log('Not logged in');
    // }
	return (
		<Router>
			<Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
			<NavBar isUserLoggedIn={isUserLoggedIn} />
			
			<Route path="/" exact component={Body} />
			<Route path="/store" 
				render={(props) => (
					<Store isUserLoggedIn={ isUserLoggedIn } />
				)}
			/>
			<Route path="/login" 
				render={(props) =>(
					<>
						<LogIn onLogIn={ handleLogIn } />
					</>
				)}
			/>
		
			<Button onClick={fireModal}>I'm a model</Button>
			

			<GlobalStyle />
        
		</Router>
	);
}

export default App;

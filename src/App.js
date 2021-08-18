import { Route} from 'react-router-dom'
import { useState } from 'react';
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
            url: "http://localhost:5000/users/authenticateUser",
        })
        if(response.data === true) {
            SetIsUserLoggedIn(true)
            window.location = ('/admin');
        } else console.log('Not logged in');
    }
	return (
		<>
			<Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
			{admin ? <AdminNavBar /> : <NavBar />}
			
			<Route path="/" exact component={Body} />
			<Route path="/store" 
				render={(props) => (
					<Store isUserLoggedIn={ isUserLoggedIn } />
				)}
			/>

			{/*Admin routes*/}

			<Route path="/login" 
				render={(props) =>(
					<>
						<LogIn />
					</>
				)}
			/>
			<Route path="/admin" component={Admin} />
			{/* <Route path="/admin/store" component={AdminStore} /> */}
			<Button onClick={fireModal}>I'm a model</Button>
			

			<GlobalStyle />
        </>
		
	);
}

export default App;

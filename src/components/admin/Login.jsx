import { useState, useEffect } from 'react';
import axios from 'axios'
import { serverAdress } from '../../globalVariables';

const LogIn = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        const response  = await axios.post(`${serverAdress}/admin/login`, { email, password },{ withCredentials: true });
        if(response.data === true) {
            window.location = ('/admin');
        } else console.log('Error logging in');
    }

    useEffect(()=>{
        authenticateUser()
    },[])

    const authenticateUser = async () => {
        const response = await axios({
            method: "GET",
            withCredentials: true,
            url: `${serverAdress}/admin/authenticateUser`,
        })
        if(response.data === true) {
            window.location = ('/admin');
        } else console.log('Not logged in');
    }
    return (
        <>
            <form style={{width:"20rem", marginTop:150, marginLeft:40}}>
                <div className="mb-3">
                    <label className="form-label">Correo corporativo</label>
                    <input onChange={(e) => SetEmail(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" autoComplete="username" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={(e) => SetPassword(e.target.value)} type="password" className="form-control" aria-describedby="passwordHelpBlock" autoComplete="current-password" />
                </div>
                <button onClick={(e) => login(e)} className="btn btn-primary">Entrar</button>
            </form>
        </>
    )
}
export default LogIn;
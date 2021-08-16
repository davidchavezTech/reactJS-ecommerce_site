import { useState } from 'react';
import axios from 'axios'
const LogIn = () => {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        const response  = await axios.post("http://localhost:5000/users/login", {
            email, password
        },{
            withCredentials: true
        })
        
        console.log(response)
    }
    return (
        <>
        <form style={{width:"20rem"}}>
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
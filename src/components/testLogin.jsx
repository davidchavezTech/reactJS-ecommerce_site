import { useState } from 'react';
import axios from 'axios'
const TestLogIn = () => {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        const response  = await axios.post("http://localhost:5000/users/login", {
            email, password
        }, {
            withCredentials: true
        })
        
        console.log(response)

        // const response = await axios.get("http://localhost:5000/users/authenticateUser")
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/users/authenticateUser",
        }).then((res) => console.log(res))
        // console.log(response)
        // if(!response.data) return window.location.pathname = "/"
        // if(!response.data) return 

    }
    const testLogin= (e) => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/users/authenticateUser",
        }).then((res) => console.log(res))
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
            <button onClick={(e) => testLogin(e)} className="btn btn-primary">Test</button>
        </>
    )
}
export default TestLogIn;
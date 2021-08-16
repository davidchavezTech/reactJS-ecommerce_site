import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios'
const CreateNewUserForm = () => {

        

    

    const [show, SetShow] = useState(0);
    const [names, SetNames] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [repeatPassword, SetRepeatPassword] = useState('');

    //Check if we are logged in!
    useEffect(() => {
        (async()=>{
            // const response = await axios.get("http://localhost:5000/users/authenticateUser")
            axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:5000/users/authenticateUser",
            }).then((res) => console.log(res))
            // console.log(response)
            // if(!response.data) return window.location.pathname = "/"
            // if(!response.data) return 
            SetShow(1)
        })()
    },[]);
    

    const createUser = async (e) => {
        e.preventDefault();
        if(password !== repeatPassword) return console.log("Passwords don't match!")
        const response  = await axios.post("http://localhost:5000/users/createUser", {
            email, password, names
        })
        if(response.data === true) console.log("User created")
        else console.log(console.log(response))
    }
    return (
        <form style={{width:"20rem", opacity:show}}>
            <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input onChange={(e) => SetNames(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Correo corporativo</label>
                <input onChange={(e) => SetEmail(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" autoComplete="username" />
            </div>
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input onChange={(e) => SetPassword(e.target.value)} type="password" className="form-control" aria-describedby="passwordHelpBlock" autoComplete="new-password" />
            </div>
            <div className="mb-3">
                <label className="form-label">Repetir Contraseña</label>
                <input onChange={(e) => SetRepeatPassword(e.target.value)} type="password" className="form-control" aria-describedby="passwordHelpBlock" autoComplete="new-password" />
            </div>
            <br />
            <button onClick={(e) => createUser(e)} className="btn btn-primary">Crear usuario</button>
        </form>
    )
}
export default CreateNewUserForm;
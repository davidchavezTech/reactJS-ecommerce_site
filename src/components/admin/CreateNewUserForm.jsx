import { useState } from 'react';
import axios from 'axios'
const CreateNewUserForm = () => {

    const [names, SetNames] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [repeatPassword, SetRepeatPassword] = useState('');

    const createUser = async (e) => {
        e.preventDefault();
        if(password !== repeatPassword) return console.log("Passwords don't match!")
        const response  = await axios.post("http://localhost:5000/users/createUser", {
            email, password, names
        })
        
        console.log(response)

    }
    return (
        <form style={{width:"20rem"}}>
            <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input onChange={(e) => SetNames(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Correo corporativo</label>
                <input onChange={(e) => SetEmail(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input onChange={(e) => SetPassword(e.target.value)} type="password" className="form-control" aria-describedby="passwordHelpBlock" />
            </div>
            <div className="mb-3">
                <label className="form-label">Repetir Contraseña</label>
                <input onChange={(e) => SetRepeatPassword(e.target.value)} type="password" className="form-control" aria-describedby="passwordHelpBlock" />
            </div>
            <br />
            <button onClick={(e) => createUser(e)} className="btn btn-primary">Crear usuario</button>
        </form>
    )
}
export default CreateNewUserForm;
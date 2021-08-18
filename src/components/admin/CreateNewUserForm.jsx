import { useState, useEffect } from 'react';
import axios from 'axios'
import UserComponent from './UserComponent';
const CreateNewUserForm = () => {

    const [names, SetNames] = useState('');
    const [userName, SetUserName] = useState('');
    const [password, SetPassword] = useState('');
    const [title, SetTitle] = useState('');
    const [number, SetNumber] = useState('');
    const [repeatPassword, SetRepeatPassword] = useState('');
    const [adminsList, SetAdminsList] = useState([])
    useEffect( async () => {
        loadUsers();
    }, [])
    
    async function loadUsers() {
        const list = await axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/admin/getUsers",
        });
        SetAdminsList(list.data)
    }
    const handleDelete = async (id) => {
        const response = await axios({
            method: "DELETE",
            withCredentials: true,
            url: `http://localhost:5000/admin/${id}`,
        });
        if(response.data === "Admin deleted.") loadUsers();
        else console.log(response)
    }
    const createUser = async (e) => {
        e.preventDefault();
        if(password !== repeatPassword) return console.log("Passwords don't match!")
        const response  = await axios.post("http://localhost:5000/admin/addAdmin", {
            userName, password, names, title, number
        })
        if(response.data === "User added!") loadUsers();
        else console.log(response)
    }
    return (
        <div style={{margin:"30px"}}>
            <br />
            <h2>Crear nuevo administrador</h2>
            <br />
            <form style={{width:"20rem"}}>
                <div className="mb-3">
                    <label className="form-label">Nombres</label>
                    <input onChange={(e) => SetNames(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input onChange={(e) => SetTitle(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número</label>
                    <input onChange={(e) => SetNumber(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo corporativo</label>
                    <input onChange={(e) => SetUserName(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" name="email" autoComplete="username" />
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
            {adminsList.map(user => <UserComponent key={user._id} id={user._id} names={user.names} userName={user.userName} title={user.title} number={user.number} onDelete={handleDelete} />)}
        </div>
    )
}
export default CreateNewUserForm;
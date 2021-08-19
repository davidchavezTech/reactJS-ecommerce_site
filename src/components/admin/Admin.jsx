import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'

const Admin = () => {

    return (
        <div>
            <h1>Administrar administradores</h1>
            <Route path="/admin" exact component={CreateNewUserForm} />
            
        </div>
    )
}
export default Admin;
import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'

const Admin = () => {

    return (
        <>
            <h1>Administrar administradores</h1>
            <Route path="/admin" exact component={CreateNewUserForm} />
            
        </>
    )
}
export default Admin;
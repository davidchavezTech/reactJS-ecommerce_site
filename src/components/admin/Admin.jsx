import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'
import AdminStore from './AdminStore'
const Admin = ({loggedIn}) => {

    return (
        <div>
            <Route path="/admin" exact component={CreateNewUserForm} />
            <Route path="/admin/store" 
				render={(props) => (
					<AdminStore loggedIn={ loggedIn } />
				)}
			/>
        </div>
    )
}
export default Admin;
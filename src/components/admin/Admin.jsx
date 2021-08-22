import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'
import AdminStore from './AdminStore'
import { Counter } from '../../features/counter'
const Admin = ({loggedIn}) => {

    return (
        <div>
            <Route path="/admin" exact component={CreateNewUserForm} />
            <Route path="/admin/store" 
				render={(props) => (
					<AdminStore loggedIn={ loggedIn } />
				)}
			/>
            <Route path="/admin" exact component={Counter} />
        </div>
    )
}
export default Admin;
import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'
import AdminStore from './AdminStore'
import EditItem from './store/EditItem'
const Admin = ({loggedIn}) => {

    return (
        <div>
            <Route path="/admin" exact component={CreateNewUserForm} />
            <Route exact path="/admin/store" 
				render={(props) => (
					<AdminStore loggedIn={ loggedIn } />
				)}
			/>
            <Route exact path="/admin/editItem/:itemId" component={EditItem} />
        </div>
    )
}
export default Admin;
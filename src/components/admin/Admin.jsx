import { Route} from 'react-router-dom'
import CreateNewUserForm from './CreateNewUserForm'
import StoreAdmin from './store/StoreAdmin'
import EditItem from './store/items/EditItem'
import CategoriesAdmin from './store/categories/CategoriesAdmin'
import EditCategory from './store/categories/EditCategory'
const Admin = ({loggedIn}) => {

    return (
        <div>
            <Route path="/admin" exact component={CreateNewUserForm} />
            <Route exact path="/admin/store" 
				render={(props) => (
					<StoreAdmin loggedIn={ loggedIn } />
				)}
			/>
            <Route exact path="/admin/editItem/:itemId" component={EditItem} />

            <Route exact path="/admin/categories/" component={CategoriesAdmin} />
            <Route exact path="/admin/categories/editCategory/:categoryId" component={EditCategory} />
        </div>
    )
}
export default Admin;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem, deleteItemById } from "../../../../features/items/itemSlice";

import ItemForm from "./itemForm/ItemForm";
import ConfirmModal from "../../../../features/modals/ConfirmModal";
import Modal from "./Modal";
const EditItem = ({ match, history }) => {
    const { itemId } = match.params

    const [toggleModal, SetToggleModal] = useState(false);
    const [showConfirmModal, SetShowConfirmModal] = useState(false)
    const dispatch = useDispatch()
    const { selectedItem } = useSelector(state => state.itemState)

    const itemStatus = useSelector(state => state.itemState.status)

    const setToggleConfirmModal = () => SetShowConfirmModal(!showConfirmModal);
    const deleteItem = async () => {
        const { payload } = await dispatch(deleteItemById(itemId))
        if(payload === "Item deleted.") history.push("/admin/store")
    }
    
    // const error = useSelector(state => state.itemState.error)
    useEffect(() => {
        if (itemStatus === 'idle') {
            dispatch(fetchItem(itemId))
        }
    }, [itemStatus, dispatch, itemId])

    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);
    return (
        <>  
            <ConfirmModal toggleModal={showConfirmModal} setToggleModal={setToggleConfirmModal} title="¿Seguro que desea eliminar este artículo?" confirmToggle={deleteItem} />

            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />

            <ItemForm onFireModal={fireModal} selectedItem={selectedItem} setToggleModal={setToggleConfirmModal}/>
        </>
    )
}
export default EditItem;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../../features/items/itemSlice";

import PreviewsContainer from "./singleItemComponents/PreviewsContainer";
import AddItemForm from "./AddItemForm";
import Modal from "../Modal";
const EditItem = ({ match }) => {
    const { itemId } = match.params

    const [toggleModal, SetToggleModal] = useState(false);

    const dispatch = useDispatch()
    const { selectedItem } = useSelector(state => state.itemState)

    const itemStatus = useSelector(state => state.itemState.status)
    // const error = useSelector(state => state.itemState.error)
    useEffect(() => {
        if (itemStatus === 'idle') {
        dispatch(fetchItem(itemId))
        }
    }, [itemStatus, dispatch])

    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);
    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />

            <PreviewsContainer imagesFileNames={selectedItem.imagesFileNames} />

            <AddItemForm onFireModal={fireModal} selectedItem={selectedItem} />
        </>
    )
}
export default EditItem;
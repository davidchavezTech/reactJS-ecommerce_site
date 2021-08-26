import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
// import { serverAdress } from '../../globalVariables'

const initialState = {
    item: {
        itemName: null,
        description: null,
        mUnitPrice: {},
        options: []
    },
    status: 'idle',
    error: null
}

const newItemSlice = createSlice({
    name: 'newItem',
    initialState,
    reducers: {
        itemAdded(state, action) {
            const { itemName, itemDescription, mType } = action.payload
            state.item.itemName = itemName;
            state.item.description = itemDescription;
            state.item.mUnitPrice = mType;
        },
        // mUnitPriceEdited(state, action) {
        //     state.item.mUnitPrice = action.payload
        // },
		optionAdded(state, action) {
			state.item.options.push(action.payload)
		}
    }
})

export default newItemSlice.reducer;
export const selectNewItem = storeState => storeState.newItemState.item
export const selectOptions = storeState => storeState.newItemState.item.options

export const { itemAdded, optionAdded } = newItemSlice.actions

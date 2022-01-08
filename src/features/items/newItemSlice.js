import { createSlice } from '@reduxjs/toolkit';
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

const newItemReducer = createSlice({
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
		},
        optionSet(state, action) {
            state.item.options = action.payload
        },
        optionRemoveOne(state, action) {
            state.item.options.splice(action.payload, 1)
        }
    }
})

export default newItemReducer.reducer;
export const selectNewItem = storeState => storeState.newItemState.item
export const selectOptions = storeState => storeState

export const { itemAdded, optionAdded, optionSet, optionRemoveOne } = newItemReducer.actions

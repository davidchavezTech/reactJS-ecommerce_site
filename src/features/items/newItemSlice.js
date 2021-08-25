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
        itemEdited(state, action) {
            const { property, value } = action.payload;
            state.item[property] = value;
        },
        mUnitPriceEdited(state, action) {
            state.item.mUnitPrice = action.payload
        },
		optionAdded(state, action) {
			state.item.options.push(action.payload)
		},
    }
})

export default newItemSlice.reducer;
export const selectNewItem = storeState => storeState.newItemState.item

export const { itemEdited, mUnitPriceEdited, optionAdded } = newItemSlice.actions

import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { serverAdress } from '../../globalVariables'


const initialState = {
  items: [],
  status: 'idle',
  error: null
}


export const postItem = createAsyncThunk(
    'items/postItem',
    async (payload, { getState }) => {
		const { itemName, priceAndUnits, description, options } = payload
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: `${serverAdress}/items/add`,
			data: {
				itemName, priceAndUnits, description, options
			}
		});
	   return payload
    }
)


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get(`${serverAdress}/items/`)
    return data
})

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
		itemAdded(state, action) {
			state.items.push(action.payload)
		},
    },
    extraReducers: {
        [fetchItems.pending]: (state, action) => {
          state.status = 'loading'
        },
        [fetchItems.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.items = action.payload
          // state.items = state.items.concat(action.payload)
        },
        [fetchItems.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
        [postItem.pending]: (state, action) => {
          state.status = 'loading'
        },
        [postItem.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.items.push(action.payload)
          // state.items = state.items.concat(action.payload)
        },
        [postItem.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      }
})

export default itemsSlice.reducer;

export const { itemAdded } = itemsSlice.actions

// export const selectAllItems = state => state.items.items
export const selectAllItems = storeState => storeState.itemsState.items

import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { serverAdress } from '../../globalVariables'


const initialState = {
  selectedItem: [],
  status: 'idle',
  error: null
}

export const fetchItem = createAsyncThunk('items/fetchItem', async (itemId) => {
  const { data } = await axios.get(`${serverAdress}/items/${itemId}`)
  return data
})

export const editItem = createAsyncThunk('items/editItem', async (payload) => {
  const { data } = await axios.post(`${serverAdress}/items/edit`,{ payload }, { withCredentials: true });
  return data
})

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
		itemRemoved(state, action) {
			console.log(action.payload)
            state.selectedItem.imagesFileNames.splice(action.payload, 1)
		},
    },
    extraReducers: {
        [fetchItem.pending]: (state, action) => {
          state.status = 'loading'
        },
        [fetchItem.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.selectedItem = action.payload;
        },
        [fetchItem.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
        [editItem.pending]: (state, action) => {
          state.status = 'loading'
        },
        [editItem.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          // state.selectedItem = action.payload;
        },
        [editItem.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      }
})

export default itemSlice.reducer;

export const { itemRemoved } = itemSlice.actions

// export const selectAllItems = storeState => storeState.itemsState.items

import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { serverAdress } from '../../globalVariables'

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get(`${serverAdress}/items/`)
    return data
})

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        
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
        }
      }
})

export default itemsSlice.reducer;

// export const selectAllItems = state => state.items.items
export const selectAllItems = storeState => storeState.itemsState.items

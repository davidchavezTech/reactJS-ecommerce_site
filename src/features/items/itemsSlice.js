import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
		const { itemName, description, imageFiles, mUnit } = payload
		let { priceAndUnits, options} = payload
		priceAndUnits = JSON.stringify(priceAndUnits)
		options = JSON.stringify(options)
		const formData = new FormData()
		//Make imageFiles file list into an node array of files to send to multer in a form data object
		//Append each image to form data
		for(let i =0; i < imageFiles.length; i++) {
			formData.append("images", imageFiles[i]);
		}
		formData.append("itemName", itemName)
		formData.append("priceAndUnits", priceAndUnits)
		formData.append("description", description)
		formData.append("mUnit", mUnit)
		formData.append("options", options)
		const { data } = await axios({
			method: "POST",
			withCredentials: true,
			url: `${serverAdress}/items/add`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" }
		});
		// //Delete the files because initial state cannot proccess files (binary data I suppose)
		// const payloadCopy = JSON.parse(JSON.stringify(payload))
		// payloadCopy.imagesFileNames = data
		// // payloadCopy.imagesFileNames = data
		// delete payloadCopy['imageFiles']
		return data
    }
)


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
	const { data } = await axios.get(`${serverAdress}/items/`)
	const orderedArray = []
	while(data.length !== 0) orderedArray.push(data.pop())
	console.log(data)
	return orderedArray
})


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
		itemAdded(state, action) {
			
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
        	state.items.unshift(action.payload)
          	// state.items = state.items.concat(action.payload)
        },
        [postItem.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
      }
})

export default itemsSlice.reducer;

export const { itemAdded } = itemsSlice.actions


export const selectAllItems = storeState => storeState.itemsState.items

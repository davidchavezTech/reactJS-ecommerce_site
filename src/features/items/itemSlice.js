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

	console.log(payload)

	const { _id, itemName, description, mUnit, oldListOfImagesURLs } = payload
  	const formData = new FormData()

	
	//"imageFiles" is an array of name+extensions of images on uploads folder of the server and actual image files
	//Extract only the files from this array into a new one to send to server and upload to server
	for(const imageFile of payload.imageFiles) {
		if(typeof imageFile === "object") formData.append("images", imageFile)
	}
	//extract the imageURLs from payload.imagesFiles into a new array
	const receivedImageURLs = [];
	for(const imageURL of payload.imageFiles) {
		if(typeof imageURL === 'string') receivedImageURLs.push(imageURL)
	}
	
	//remove received urls from oldListOfImagesURLs
	for(const imageURL of receivedImageURLs){
		const index = oldListOfImagesURLs.indexOf(imageURL);
		oldListOfImagesURLs.splice(index, 1)
	}
	
	//stringify arrays and objects to send as form data
	let priceAndUnits = JSON.stringify(payload.priceAndUnits)
	let options = JSON.stringify(payload.options)
	const imageURLsToKeep = JSON.stringify(receivedImageURLs)
	const imageURLsToDelete = JSON.stringify(oldListOfImagesURLs)

	formData.append("_id", _id)
	formData.append("itemName", itemName)
	formData.append("priceAndUnits", priceAndUnits)
	formData.append("description", description)
	formData.append("mUnit", mUnit)
	formData.append("options", options)
	formData.append("imageURLsToKeep", imageURLsToKeep)
	formData.append("imageURLsToDelete", imageURLsToDelete)
	const { data } = await axios({
		method: "POST",
		withCredentials: true,
		url: `${serverAdress}/items/edit`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" }
  	});

  return data
})

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
		itemRemoved(state, action) {
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

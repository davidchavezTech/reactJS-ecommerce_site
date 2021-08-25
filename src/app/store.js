import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import itemsReducer from '../features/items/itemsSlice';
import newItemSlice from '../features/items/newItemSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    itemsState: itemsReducer,
    newItemState: newItemSlice
    // newItemState: newItemReducer
  }
})
import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/items/itemsSlice';
import newItemReducer from '../features/items/newItemSlice';

export default configureStore({
  reducer: {
    itemsState: itemsReducer,
    newItemState: newItemReducer
  }
})
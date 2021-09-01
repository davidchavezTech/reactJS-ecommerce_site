import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/items/itemsSlice';
import newItemReducer from '../features/items/newItemSlice';
import itemSlice from '../features/items/itemSlice';

export default configureStore({
  reducer: {
    itemsState: itemsReducer,
    newItemState: newItemReducer,
    itemState: itemSlice
  }
})
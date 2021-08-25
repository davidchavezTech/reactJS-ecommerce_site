import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import itemsReducer from '../features/items/itemsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    itemsState: itemsReducer
  }
})
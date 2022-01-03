import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import booksSlice from './features/booksSlice'

export default configureStore({
  reducer: {
    books: booksSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})
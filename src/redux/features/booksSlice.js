import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {API} from '../../service/service'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function ({page}, {rejectWithValue}) {
    try {
      const res = await API.get('/ne', {params: {page}})
      return res.data.books.map(_transform)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const _transform = (data) => {
  return {
    title: data.title,
    subtitle: data.subtitle,
    id: data.isbn13,
    price: data.price,
    image: data.image,
    url: data.url
  }
}

const _booksPrice = (arr) => arr.reduce((num, obj) => obj.price.slice(1) + num, 0)
const _totalCount = (obj) => [].concat.apply([], Object.values(obj)).reduce((num, obj) => obj.count + num, 0)
const _totalPrice = (obj) => [].concat.apply([], Object.values(obj)).reduce((num, obj) => obj.price + num, 0)

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    data: [],
    cart: {},
    totalCount: 0,
    totalPrice: 0,
    status: null,
    error: null
  },
  reducers: {
    bookAddCart: (state, action) => {
      const newBooks = !state.cart[action.payload.id] ?
        [{...action.payload}] : [...state.cart[action.payload.id].books, {...action.payload}]

      const newCart = {
        ...state.cart,
        [action.payload.id]: {
          books: newBooks,
          count: newBooks.length,
          price: _booksPrice(newBooks)
        }
      }

      const count = _totalCount(newCart)
      const price = _totalPrice(newCart)

      return {
        ...state,
        cart: newCart,
        totalCount: count,
        totalPrice: price
      }
    },
    bookDeleteCart: (state, action) => {
      const newCart = {
        ...state.cart
      }

      const count = _totalCount(newCart)
      const price = _totalPrice(newCart)

      delete newCart[action.payload.id]

      return {
        ...state,
        cart: newCart,
        totalCount: count,
        totalPrice: price
      }
    },
    incrementCartCounter: (state, action) => {
      const newBooks = [
        ...state.cart[action.payload.id].books,
        Object.assign({}, state.cart[action.payload.id].books[0])
      ]

      const newCart = {
        ...state.cart,
        [action.payload.id]: {
          books: newBooks,
          count: newBooks.length,
          price: _booksPrice(newBooks)
        }
      }

      const count = _totalCount(newCart)
      const price = _totalPrice(newCart)

      return {
        ...state,
        cart: newCart,
        totalCount: count,
        totalPrice: price
      }
    },
    decrementCartCounter: (state, action) => {
      const newBooks = state.cart[action.payload.id].books.length > 1 ?
        state.cart[action.payload.id].books.slice(1) : state.cart[action.payload.id].books
      
      const newCart = {
        ...state.cart,
        [action.payload.id]: {
          books: newBooks,
          count: newBooks.length,
          price: _booksPrice(newBooks)
        }
      }

      const count = _totalCount(newCart)
      const price = _totalPrice(newCart)

      return {
        ...state,
        cart: newCart,
        totalCount: count,
        totalPrice: price
      }
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: {},
        totalCount: 0,
        totalPrice: 0
      }
    }
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export const {bookAddCart, bookDeleteCart, incrementCartCounter, decrementCartCounter, clearCart} = booksSlice.actions
export default booksSlice.reducer
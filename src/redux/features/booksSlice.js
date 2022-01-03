import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {API} from '../../service/service'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function (_, {rejectWithValue, dispatch, getState}) {
    try {
      const {currentPage} = getState().books
      const res = await API.get('/new', {params: {page: currentPage}})
      dispatch(incCurrentPage())
      dispatch(incTotalPage(res.data.total / res.data.books.length))
      return res.data.books.map(_transform)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const _transform = (data) => {
  return {
    id: data.isbn13,
    title: data.title,
    subtitle: data.subtitle,
    price: _number(_rate(data.price)),
    image: data.image,
    url: data.url
  }
}
const _rate = (price) => Number((price.slice(1) * 435).toFixed(0))
const _number = (number) => number <= 0 ? 30000 : number //чтобы изменить 0 на 30000
const _booksPrice = (arr) => arr.reduce((num, obj) => obj.price + num, 0)
const _totalCount = (obj) => [].concat.apply([], Object.values(obj)).reduce((num, obj) => obj.count + num, 0)
const _totalPrice = (obj) => [].concat.apply([], Object.values(obj)).reduce((num, obj) => obj.price + num, 0)

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    data: [],
    filter: [],
    totalPage: null,
    currentPage: 1,
    cart: {},
    totalCount: null,
    totalPrice: null,
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

      const count = newCart[action.payload.id].count
      const price = newCart[action.payload.id].price

      delete newCart[action.payload.id]

      return {
        ...state,
        cart: newCart,
        totalCount: state.totalCount - count,
        totalPrice: state.totalPrice - price
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
    },
    incCurrentPage: (state) => {
      return {
        ...state,
        currentPage: state.currentPage + 1
      }
    },
    incTotalPage: (state, action) => {
      return {
        ...state,
        totalPage: action.payload
      }
    },
    searchHandler: (state, action) => {
      if (action.payload.target.value.length === 0) {
        return {
          ...state,
          filter: state.data
        }
      } else {
        return {
          ...state,
          filter: state.data.filter(item => item.title.toLowerCase().indexOf(action.payload.target.value))
        }
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

export const {
  bookAddCart,
  bookDeleteCart,
  incrementCartCounter,
  decrementCartCounter,
  clearCart,
  incCurrentPage,
  incTotalPage,
  searchHandler
} = booksSlice.actions
export default booksSlice.reducer
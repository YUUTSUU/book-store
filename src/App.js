import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
import {MainPage} from './page/mainPage/MainPage'
import {CartPage} from './page/cartPage/CartPage'
import {useBooks} from "./hook/useBooks"
import {BooksContext} from './context/BooksContext'
import './App.scss'

function App() {
  const booksHook = useBooks()

  return (
    <Provider store={store}>
      <BooksContext.Provider value={booksHook}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </BooksContext.Provider>
    </Provider>
  )
}

export default App
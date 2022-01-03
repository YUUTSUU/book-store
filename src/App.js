import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
import {MainPage} from './page/mainPage/MainPage'
import {CartPage} from './page/cartPage/CartPage'
import {NotFound} from "./page/404/NotFound";
import './style/Style.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='*' element={<NotFound />} status={404} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
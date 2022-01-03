import {useContext} from 'react'
import {Menu} from '../../component/menu/Menu'
import {BooksContext} from '../../context/BooksContext'
import {Cart} from '../../component/cart/Cart'
import {Check} from '../../component/check/Check'
import './CartPage.scss'

export const CartPage = () => {
  const {booksItems, booksDeleteCart, sum, sumDollar, booksItemsCart, cartItems, totalCurrent, totalCount, deleteItemsCart} = useContext(BooksContext)

  const cartHandler = (id) => {
    booksDeleteCart(id)
  }

  return (
    <section className='cart'>
      <Menu />
      <div className="container">
        <div className='cart__container'>
          <div className='cart__inner'>
            <ul className='cart__list'>
              {booksItems.map((item, i) => (
                <Cart key={i} {...item}
                  cartHandler={cartHandler}
                  sumDollar={sumDollar}
                  booksItemsCart={booksItemsCart}
                  deleteItemsCart={deleteItemsCart}
                  cartItems={cartItems}
                  totalCurrent={totalCurrent}
                  totalCount={totalCount}
                />
              ))}
            </ul>
            <Check sum={sum}/>
          </div>
        </div>
      </div>
    </section>
  )
}
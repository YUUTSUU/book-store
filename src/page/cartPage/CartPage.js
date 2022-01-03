import {useSelector} from 'react-redux'
import {Menu} from '../../component/menu/Menu'
import {Cart} from '../../component/cart/Cart'
import {Check} from '../../component/check/Check'

export const CartPage = () => {
  const {cart} = useSelector(state => state.books)
  const data = Object.keys(cart).map(key => cart[key].books[0])

  return (
    <section className='cart'>
      <Menu />
      <div className="container">
        <div className='cart__container'>
          <div className='cart__inner'>
            <ul className='cart__list'>
              {data && data.map(item => <Cart key={item.id} {...item} />)}
            </ul>
            <Check />
          </div>
        </div>
      </div>
    </section>
  )
}
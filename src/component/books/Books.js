import {useDispatch, useSelector} from 'react-redux'
import {bookAddCart, bookDeleteCart} from '../../redux/features/booksSlice'

export const Books = (props) => {
  const {cart} = useSelector(state => state.books)
  const dispatch = useDispatch()

  return (
    <li className="books__item">
      <div className="books__image">
        <img src={props.image} alt="" />
      </div>
      <div className='books__content'>
        <div className='books__text'>
          <h3 className="books__title">{props.title}</h3>
          <span className="books__description">{props.subtitle}</span>
        </div>
        <div className='books__footer'>
          <div className="books__price">
            <span>Price:</span>
            <b>{props.price} <span>KZT</span></b>
          </div>
          <button
            className={cart.hasOwnProperty(props.id) && cart[props.id].books.find(item => item.id === props.id) ?
              "books__button books__button_active" : "books__button"}
            onClick={() => cart.hasOwnProperty(props.id) && cart[props.id].books.find(item => item.id === props.id) ?
              dispatch(bookDeleteCart(props)) : dispatch(bookAddCart(props))}
          >
            {cart.hasOwnProperty(props.id) && cart[props.id].books.find(item => item.id === props.id) ?
              'added' : 'add to cart'}
          </button>
        </div>
      </div>
    </li>
  )
}


import {useDispatch, useSelector} from 'react-redux'
import {MdOutlineDeleteOutline} from "react-icons/md";
import {HiPlus, HiMinus} from "react-icons/hi"
import {bookDeleteCart, incrementCartCounter, decrementCartCounter, } from '../../redux/features/booksSlice'

export const Cart = (props) => {
  const {cart} = useSelector(state => state.books)
  const dispatch = useDispatch()

  return (
    <li className='cart__item'>
      <div className='cart__left'>
        <div className='cart__image'>
          <img src={props.image} alt="" />
        </div>
        <h3 className='cart__title'>{props.title}</h3>
      </div>
      <div className='cart__right'>
        <div className='cart__counter'>
          <HiMinus className='cart__counter_item' onClick={() => dispatch(decrementCartCounter(props))}/>
          <span className="cart__num">{cart[props.id].count}</span>
          <HiPlus className='cart__counter_item' onClick={() => dispatch(incrementCartCounter(props))} />
        </div>
        <MdOutlineDeleteOutline className='cart__delete' onClick={() => dispatch(bookDeleteCart(props))}/>
        <span className='cart__price'><b>{props.price}</b> KZT</span>
      </div>
    </li>
  )
}
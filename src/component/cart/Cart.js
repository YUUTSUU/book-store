import {useState} from 'react'
import {MdOutlineDeleteOutline} from "react-icons/md";
import {HiPlus, HiMinus} from "react-icons/hi"
import './Cart.scss'
import {useEffect} from 'react';

export const Cart = ({image, title, price, isbn13, cartHandler, sumDollar, booksItemsCart, cartItems, totalCurrent, totalCount, deleteItemsCart}) => {
  const [counter, setCounter] = useState(1)

  const counterIncrement = (e) => {
    setCounter(prevCounter => ++prevCounter)
    sumDollar(price.slice(1) * counter)
    booksItemsCart(isbn13, price.slice(1))
    
  }

  const counterDecrement = (e) => {
    if (counter >= 1)
    setCounter(prevCounter => Math.max(--prevCounter, 1))
    deleteItemsCart(isbn13, price.slice(1))
  }

  useEffect(() => {
    console.log(cartItems)
    console.log(totalCount)
  }, [cartItems])

  // useEffect(() => {
  //   booksItemsCart(isbn13, price.slice(1))
  // }, [])

  return (
    <li className='cart__item'>
      <div className='cart__left'>
        <div className='cart__image'>
          <img src={image} alt="" />
        </div>
        <h3 className='cart__title'>{title}</h3>
      </div>
      <div className='cart__right'>
        <div className='cart__counter'>
          <HiMinus className='cart__counter_item' onClick={counterDecrement}/>
          <span className="cart__num">{counter}</span>
          <HiPlus className='cart__counter_item' onClick={counterIncrement}/>
        </div>
        <MdOutlineDeleteOutline className='cart__delete' onClick={() => cartHandler(isbn13)} />
        <b className='cart__price'>${price.slice(1)}</b>
      </div>
    </li>
  )
}
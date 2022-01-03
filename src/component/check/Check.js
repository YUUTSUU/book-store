import {useSelector} from 'react-redux'

export const Check = () => {
  const {totalCount, totalPrice} = useSelector(state => state.books)

  return (
    <div className="check">
      <div className='check__price'>
        <span>{!totalCount ? 0 : totalCount} books worth:</span>
        <b>{!totalPrice ? 0 : totalPrice}</b>
      </div>
      {
        !totalPrice ? null :
          (
            <div className='check__pay'>
              <span>to pay</span>
              <b>{totalPrice}</b>
            </div>
          )
      }
      <button className='check__button'>Checkout</button>
    </div>
  )
}
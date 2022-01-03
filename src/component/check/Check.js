import './Check.scss'

export const Check = ({sum}) => {
  return (
    <div className="check">
      <div className='check__price'>
        <span>{0} книг на сумму:</span>
        <b>{sum.toFixed(2)}</b>
      </div>
      <button className='check__button'>Оформить заказ</button>
    </div>
  )
}
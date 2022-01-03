import './Books.scss'

export const Books = ({title, subtitle, price, image, isbn13, booksId, booksHandler, booksItemsCart}) => {
  return (
    <li className="books__item">
      <div className="books__image">
        <img src={image} alt="" />
      </div>
      <div className='books__content'>
        <div className='books__text'>
          <h3 className="books__title">{title}</h3>
          <span className="books__description">{subtitle}</span>
        </div>
        <div className='books__footer'>
          <div className="books__price">
            <span>Цена:</span>
            <b>${price.slice(1)}</b>
          </div>
          <button
            className={booksId.includes(isbn13) ? "books__button books__button_active" : "books__button"}
            onClick={
              () => {
                booksHandler(isbn13)
                booksItemsCart(isbn13, price.slice(1))
              }
            }
          >
            {booksId.includes(isbn13) ? 'Добавлено' : 'В корзину'}
          </button>
        </div>
      </div>
    </li>
  )
}


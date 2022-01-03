import {Link} from "react-router-dom"
import {MdShoppingCart} from "react-icons/md";
import './Menu.scss'

export const Menu = () => {
  return (
    <div className="menu">
      <div className="container">
        <div className="menu__wrapper">
          <div className="menu__brand">
            <Link to="/" className="menu__logo">Book Store</Link>
          </div>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/cart" className="menu__link">
                <MdShoppingCart />
                <span className="menu__text">Корзина</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
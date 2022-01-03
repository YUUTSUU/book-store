import {useState} from "react"

export const useBooks = () => {
  const [booksId, setBooksId] = useState([])
  const [booksItems, setBooksItems] = useState([])
  const [counter, setCounter] = useState(1)
  const [sum, setSum] = useState(0)
  const [cartItems, setCartItems] = useState({})

  const [totalCount, setTotalCount] = useState()
  const [totalPrice, setTotalPrice] = useState(0)

  const booksItemsCart = (id, price) => {
    setCartItems(prevCartItems => {
      let currentItems = !prevCartItems[id] ? [{id, price}] : [...prevCartItems[id].items, {id, price}]
      return {
        ...prevCartItems,
        [id]: {
          items: currentItems,
          totalCount: currentItems.length,
          totalPrice: currentItems.length * price
        }
      }
    })
    totalCountCheck(id)
  }

  const totalCountCheck = () => {
    const key = Object.keys(cartItems)
    const price = []
    const count = []
    for (let value of key) {
      count.push(cartItems[value].totalCount)
      price.push(cartItems[value].totalPrice)
    }
    // const obj = {
    //   totalPrice: price.reduce((a, b) => b + a, price[0])
      
    // } 
    setTotalCount(price.reduce((a, b) => b + a, 0))
  }

  const deleteItemsCart = (id, price) => {
    setCartItems(prevCartItems => {
      let currentItems = prevCartItems[id].items.length > 1 ? prevCartItems[id].items.slice(1) : prevCartItems[id].items
      return {
        ...prevCartItems,
        [id]: {
          items: currentItems,
          totalCount: currentItems.length,
          totalPrice: currentItems.length * price
        }
      }
    })
    totalCountCheck()
  }

  const sumDollar = (n) => {
    setSum(prevSum => prevSum + n)
  }

  const counterIncrement = (e) => {
    setCounter(prevCounter => prevCounter + 1)
  }

  const counterDecrement = (e) => {
    setCounter(prevCounter => Math.max(prevCounter - 1, 1))
  }

  const booksAddCart = (id, books) => {
    if (!booksId.includes(id)) {
      setBooksId(prevBooksId => [...prevBooksId, id])
      setBooksItems(prevBooksItems => [...prevBooksItems, books.find(item => item.isbn13 === id)])
      totalCountCheck()
    }
  }

  const booksDeleteCart = (id) => {
    setBooksId(booksId.filter(item => !id.includes(item)))
    setBooksItems(booksItems.filter(item => !id.includes(item.isbn13)))
  }

  return {booksId, booksItems, booksAddCart, booksDeleteCart, counter, counterIncrement, counterDecrement, sum, sumDollar, booksItemsCart, cartItems, totalCount, deleteItemsCart}
}
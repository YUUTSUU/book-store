import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBooks} from '../../redux/features/booksSlice'
import {useContext} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {Spinner} from '../../component/spinner/Spinner'
import {Books} from '../../component/books/Books'
import {Menu} from '../../component/menu/Menu'
import {API} from '../../service/service'
import {BooksContext} from '../../context/BooksContext'
import './MainPage.scss'

export const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(3)
  const [total, setTotal] = useState(0)
  const {booksId, booksAddCart, booksItemsCart} = useContext(BooksContext)
  const {data, status, error} = useSelector(state => state.books)
  const dispatch = useDispatch()

  const booksHandler = (id) => {
    booksAddCart(id, books)
  }

  const fetchBook = (page) => {
    API.get('/new', {params: {page}})
      .then(res => {
        setBooks(prevBooks => [...prevBooks, ...res.data.books])
        setPage(prevPage => prevPage + 1)
        setTotal(res.data.total)
        setLoading(false)
        console.log('request')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchBook(page)
    console.log('render')
    dispatch(fetchBooks({page}))
  }, [dispatch])

  return (
    <section className='main__page'>
      <Menu />
      <div className="container">
        <div className='main__container'>
          {status === 'loading' ? <Spinner key={0} /> : null}
          <InfiniteScroll
            element={'ul'}
            pageStart={page}
            loadMore={() => fetchBook(page)}
            hasMore={page < total ? true : false}
            threshold={700}
            loader={<Spinner key={0} />}
            initialLoad={false}
            isReverse={false}
            className='books__list'
          >
            {data.map((item, i) => (<Books key={i} {...item} booksId={booksId} booksHandler={booksHandler}
              booksItemsCart={booksItemsCart} />))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}
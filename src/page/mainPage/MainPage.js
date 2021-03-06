import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBooks} from '../../redux/features/booksSlice'
import InfiniteScroll from 'react-infinite-scroller'
import {Spinner} from '../../component/spinner/Spinner'
import {Books} from '../../component/books/Books'
import {Menu} from '../../component/menu/Menu'
import {Error} from '../../component/error/Error'

export const MainPage = () => {
  const {data, status, currentPage, totalPage} = useSelector(state => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
    console.log('render')
  }, [dispatch])

  return (
    <section className='page'>
      <Menu />
      <div className="container">
        <div className='page__container'>
          {status === 'rejected' ? <Error /> : null}
          {status === 'loading' ? <Spinner key={0} /> : null}
          <InfiniteScroll
            element={'ul'}
            pageStart={currentPage}
            loadMore={() => dispatch(fetchBooks())}
            hasMore={currentPage < totalPage ? true : false}
            threshold={200}
            loader={<Spinner key={0} />}
            initialLoad={false}
            isReverse={false}
            className='books__list'
          >
            {data.map((item, i) => (<Books key={i} {...item} />))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}
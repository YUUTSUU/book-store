import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBooks} from '../../redux/features/booksSlice'
import InfiniteScroll from 'react-infinite-scroller'
import {Spinner} from '../../component/spinner/Spinner'
import {Books} from '../../component/books/Books'
import {Menu} from '../../component/menu/Menu'
import {Error} from '../../component/error/Error'

export const MainPage = () => {
  const {data, filter, status, currentPage, totalPage} = useSelector(state => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
    console.log('render')
  }, [dispatch])

  return (
    <section className='main__page'>
      <Menu />
      <div className="container">
        <div className='main__container'>
          <InfiniteScroll
            element={'ul'}
            pageStart={currentPage}
            loadMore={() => dispatch(fetchBooks())}
            hasMore={currentPage < totalPage ? true : false}
            threshold={700}
            loader={<Spinner key={0} />}
            initialLoad={false}
            isReverse={false}
            className='books__list'
          >
            {status === 'rejected' ? <Error /> : null}
            {status === 'loading' ? <Spinner key={0} /> : data.map((item) => (<Books key={item.id} {...item} />))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}
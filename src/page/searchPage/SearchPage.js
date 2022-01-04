import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {searchBooks, clearSearchData} from '../../redux/features/booksSlice'
import InfiniteScroll from 'react-infinite-scroller'
import {Spinner} from '../../component/spinner/Spinner'
import {Books} from '../../component/books/Books'
import {Menu} from '../../component/menu/Menu'
import {Error} from '../../component/error/Error'

export const SearchPage = () => {
  const {searchData, status, currentSearchPage, totalSearchPage} = useSelector(state => state.books)
  const dispatch = useDispatch()
  const {query} = useParams()

  useEffect(() => {
    dispatch(clearSearchData())
    dispatch(searchBooks(query))
    console.log('render')
  }, [dispatch, query])

  return (
    <section className='page'>
      <Menu />
      <div className="container">
        <div className='page__container'>
          {status === 'rejected' ? <Error /> : null}
          {status === 'loading' ? <Spinner key={0} /> : null}
          <InfiniteScroll
            element={'ul'}
            pageStart={currentSearchPage}
            loadMore={() => dispatch(searchBooks(query))}
            hasMore={currentSearchPage < totalSearchPage ? true : false}
            threshold={200}
            loader={<Spinner key={0} />}
            initialLoad={false}
            isReverse={false}
            className='books__list'
          >
            {searchData.map((item, i) => (<Books key={i} {...item} />))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}
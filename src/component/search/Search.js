import {useDispatch, useSelector} from 'react-redux'
import {searchHandler} from '../../redux/features/booksSlice'
import {useNavigate} from 'react-router-dom'

export const Search = () => {
  const {searchText} = useSelector(state => state.books)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchDispatch = (e) => {
    e.preventDefault()
    if (searchText !== '') {
      navigate(`/search/${ searchText.slice().toLowerCase() }`)
    }
  }

  return (
    <form className='search__form' >
      <input type="text" placeholder="Search" onChange={(e) => dispatch(searchHandler(e))} value={searchText} />
      <button onClick={searchDispatch}>
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path fillRule="evenodd" clipRule="evenodd" d="M19.616 18.6924H20.6364L26.1131 24.1949C26.6426 24.7245 26.6426 25.5899 26.1131 26.1195C25.5835 26.6491 24.7181 26.6491 24.1885 26.1195L18.6989 20.6299V19.6095L18.3501 19.2479C16.5418 20.7979 14.0747 21.5987 11.4526 21.1595C7.8618 20.5524 4.9943 17.5558 4.55514 13.9391C3.88347 8.47535 8.4818 3.87702 13.9456 4.54868C17.5622 4.98785 20.5589 7.85535 21.166 11.4462C21.6051 14.0683 20.8043 16.5353 19.2543 18.3437L19.616 18.6924ZM7.07392 12.8799C7.07392 16.0962 9.67017 18.6924 12.8864 18.6924C16.1027 18.6924 18.6989 16.0962 18.6989 12.8799C18.6989 9.66368 16.1027 7.06743 12.8864 7.06743C9.67017 7.06743 7.07392 9.66368 7.07392 12.8799Z" fill="rgb(23, 103, 207)" />
        </svg>
      </button>
    </form>
  )
}
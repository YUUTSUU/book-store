import {useDispatch} from 'react-redux'

export const Search = () => {
  const dispatch = useDispatch()

  return (
    <input type="text" className="seacrh__panel" placeholder="Search" onChange={(e) => dispatch(searchHandler(e))}/>
  )
}
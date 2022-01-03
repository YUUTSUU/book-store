import ErrorImage from '../../assets/404.png'

export const Error = () => {
  return (
    <div className="error">
      <img src={ErrorImage} alt="error" style={{width: '100vw', height: '80vh'}} />
    </div>
  )
}
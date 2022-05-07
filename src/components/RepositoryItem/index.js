// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repository-name">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="starsCount">{starsCount}</p>
      </div>

      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="icons"
        />
        <p className="forksCount">{forksCount}</p>
      </div>

      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="issuesCount">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem

// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, LanguageDetails, setLanguageFilteredId} = props
  const {id, language} = LanguageDetails
  const btnClassName = isActive ? 'active-button' : 'button'

  const OnClickLanguageFiltered = () => {
    setLanguageFilteredId(id)
  }

  return (
    <li className="list-items">
      <button
        type="button"
        className={btnClassName}
        onClick={OnClickLanguageFiltered}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

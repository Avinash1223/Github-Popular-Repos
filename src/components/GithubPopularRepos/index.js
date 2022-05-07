import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
    ActiveFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.renderRepositoriesListView()
  }

  renderRepositoriesListView = async () => {
    const {ActiveFilterId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${ActiveFilterId}`
    // const options = {
    //   method: 'GET',
    // }
    const response = await fetch(url)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const UpdatedData = fetchedData.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      console.log(UpdatedData)
      this.setState({
        repositoryList: UpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRepositoryList = () => {
    const {repositoryList} = this.state

    return (
      <div>
        <ul className="repository-container">
          {repositoryList.map(eachObj => (
            <RepositoryItem repositoryDetails={eachObj} key={eachObj.id} />
          ))}
        </ul>
      </div>
    )
  }

  setLanguageFilteredId = newFilteredId => {
    this.setState(
      {ActiveFilterId: newFilteredId},
      this.renderRepositoriesListView,
    )
  }

  render() {
    const {ActiveFilterId} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              LanguageDetails={eachItem}
              key={eachItem.id}
              isActive={eachItem.id === ActiveFilterId}
              setLanguageFilteredId={this.setLanguageFilteredId}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos

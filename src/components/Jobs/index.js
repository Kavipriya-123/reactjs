import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'

class Jobs extends Component {
  state = {
    jobList: [],
    salary: '',
    searchValue: '',
    searchInput: '',
    userFullDetail: {},
    selectedEmploymentTypes: [
      {id: 'FULLTIME', value: false},
      {id: 'PARTTIME', value: false},
      {id: 'FREELANCE', value: false},
      {id: 'INTERNSHIP', value: false},
    ],
  }

  componentDidMount() {
    this.userProfile()
    this.getJobsData()
  }

  inputChange = event => {
    this.setState({searchValue: event.target.value})
  }

  salaryChange = event => {
    this.setState({salary: event.target.value}, this.getJobsData)
  }

  employmentChange = event => {
    this.setState(
      prevState => ({
        selectedEmploymentTypes: prevState.selectedEmploymentTypes.map(each => {
          if (each.id === event.target.value) {
            return {...each, value: !each.value}
          }
          return {...each}
        }),
      }),
      this.getJobsData,
    )
  }

  searchBtnClicked = () => {
    this.setState(
      prevState => ({searchInput: prevState.searchValue}),
      this.getJobsData,
    )
  }

  getJobsData = async () => {
    const {selectedEmploymentTypes, salary, searchInput} = this.state
    const filteredEmpList = selectedEmploymentTypes.filter(
      each => each.value === true,
    )
    const emptypes = filteredEmpList.map(each => each.id).join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${emptypes}&minimum_package=${salary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      const newData = jsonData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobList: newData})
    }
  }

  userProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      const newData = {
        name: jsonData.profile_details.name,
        profileImageUrl: jsonData.profile_details.profile_image_url,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({userFullDetail: newData})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {salaryRangesList, employmentTypesList} = this.props

    const {
      userFullDetail,
      jobList,
      salary,
      selectedEmploymentTypes,
    } = this.state

    return (
      <div>
        <Header />
        <div className="jobs-cont">
          <div className="jobs-left-cont">
            <UserProfile userProfileDetails={userFullDetail} />
            <hr />
            <h1>Type of Employment</h1>
            <ul className="unorder-emp-salary">
              {employmentTypesList.map(each => (
                <li className="salary-emp" key={each.employmentTypeId}>
                  <input
                    className="salary-emp"
                    onChange={this.employmentChange}
                    checked={selectedEmploymentTypes.some(
                      item =>
                        item.id === each.employmentTypeId &&
                        item.value === true,
                    )}
                    id={each.employmentTypeId}
                    type="checkbox"
                    value={each.employmentTypeId}
                  />
                  <label className="salary-emp" htmlFor={each.employmentTypeId}>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul className="unorder-emp-salary">
              {salaryRangesList.map(each => (
                <li className="salary-emp" key={each.salaryRangeId}>
                  <input
                    className="salary-emp"
                    onChange={this.salaryChange}
                    value={each.salaryRangeId}
                    type="radio"
                    checked={salary === each.salaryRangeId}
                    id={each.salaryRangeId}
                  />
                  <label className="salary-emp" htmlFor={each.salaryRangeId}>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="search-cont">
              <input
                onChange={this.inputChange}
                className="input-search"
                type="search"
              />
              <button
                data-testid="searchButton"
                onClick={this.searchBtnClicked}
                className="search-icon-btn"
                type="button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul>
              {jobList.map(each => (
                <JobItem key={each.id} itemDetails={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobItemDetailsTopPart from '../JobItemDetailsTopPart'
import Skills from '../Skills'
import SimilarJob from '../SimilarJob'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetailsData: {}, similarJobs: [], isLoading: true, jobtitle: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url2 = 'https://apis.ccbp.in/jobs'
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      const jobResponse = await fetch(url2, options)
      const jobsJsonData = await jobResponse.json()
      const jobTitle = jobsJsonData.jobs.filter(each => each.id === id)
      const jobtitlesample = jobTitle[0].title
      let jobDetails = jsonData.job_details
      jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const similarJobsData = jsonData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        isLoading: false,
        similarJobs: similarJobsData,
        jobDetailsData: jobDetails,
        jobtitle: jobtitlesample,
      })
    }
  }

  render() {
    const {jobDetailsData, similarJobs, isLoading, jobtitle} = this.state
    if (isLoading === true) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    const {lifeAtCompany} = jobDetailsData
    const {description, imageUrl} = lifeAtCompany
    const {skills} = jobDetailsData
    return (
      <>
        <Header />
        <div className="full-detail-job-cont">
          <div className="full-detail-top">
            <JobItemDetailsTopPart
              itemDetails={jobDetailsData}
              title={jobtitle}
            />
            <h2 className="skill-head">Skills</h2>
            <ul className="skills-cont">
              {skills.map(each => (
                <Skills key={each.name} itemDetails={each} />
              ))}
            </ul>
            <div>
              <h2 className="skill-head">Life at Company</h2>
              <div className="lifeAt-cont">
                <p>{description}</p>
                <img src={imageUrl} alt="at company" />
              </div>
            </div>
          </div>
          <h2>Similar Jobs</h2>
          <ul className="similar-job-cont">
            {similarJobs.map(each => (
              <SimilarJob key={each.id} itemDetails={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}
export default JobItemDetails

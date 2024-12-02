import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {itemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = itemDetails
  return (
    <Link className="link-element" to={`/jobs/${id}`}>
      <li className="job-card-cont">
        <div className="job-iconTitle-cont">
          <img
            className="jobItem-icon"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h3>{title}</h3>
            <p>
              <AiFillStar className="rating-star" /> {rating}
            </p>
          </div>
        </div>
        <div className="job-rating-cont">
          <div className="location-emptype">
            <p>
              <IoLocationOutline /> {location}
            </p>
            <p>
              <BsBriefcaseFill /> {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem

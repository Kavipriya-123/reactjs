import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {itemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = itemDetails
  return (
    <li className="similar-card">
      <div className="job-iconTitle-cont">
        <img
          className="jobItem-icon"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h3>{title}</h3>
          <p>
            <AiFillStar className="rating-star" /> {rating}
          </p>
        </div>
      </div>
      <h2>Description</h2>
      <p>{jobDescription}</p>
      <div className="location-emptype">
        <p>
          <IoLocationOutline /> {location}
        </p>
        <p>
          <BsBriefcaseFill /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJob

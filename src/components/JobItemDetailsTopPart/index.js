import {AiFillStar} from 'react-icons/ai'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'

const JobItemDetailsTopPart = props => {
  const {itemDetails, title} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    companyWebsiteUrl,
  } = itemDetails
  return (
    <div className="job-card-cont">
      <div className="top-job-iconTitle-cont">
        <img
          className="top-jobItem-icon"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div>
          <h3>{title}</h3>
          <p>
            <AiFillStar className="top-rating-star" /> {rating}
          </p>
        </div>
      </div>
      <div className="location-emptype">
        <p>
          <IoLocationOutline /> {location}
        </p>
        <p>
          <BsBriefcaseFill /> {employmentType}
        </p>
      </div>
      <hr />
      <div className="description-cont ">
        <h2>Description</h2>
        <a href={companyWebsiteUrl} aria-label="Visit Company Website">
          Visit <FaExternalLinkAlt />
        </a>
      </div>
      <p>{jobDescription}</p>
    </div>
  )
}

export default JobItemDetailsTopPart

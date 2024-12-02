import './index.css'

const UserProfile = props => {
  const {userProfileDetails} = props
  const {name, profileImageUrl, shortBio} = userProfileDetails
  return (
    <div className="userCard">
      <img className="userImage" src={profileImageUrl} alt="profile" />
      <h2>{name}</h2>
      <p className="user-description">{shortBio}</p>
    </div>
  )
}

export default UserProfile

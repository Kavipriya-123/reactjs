import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineHome} from 'react-icons/ai'
import {BiSolidExit} from 'react-icons/bi'
import {BsSuitcaseLg} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onLogoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header-bg-lg">
        <Link to="/">
          <img
            className="header-web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div>
          <Link className="home-jobs-link" to="/">
            Home
          </Link>
          <Link className="home-jobs-link" to="/Jobs">
            Jobs
          </Link>
        </div>
        <button className="logout-btn" onClick={onLogoutClicked} type="button">
          Logout
        </button>
      </div>
      <div className="header-bg-sm">
        <Link to="/">
          <img
            className="header-web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div>
          <Link className="home-jobs-link" to="/">
            <AiOutlineHome />
          </Link>
          <Link className="home-jobs-link" to="/Jobs">
            <BsSuitcaseLg />
          </Link>

          <button
            className="logout-btn"
            onClick={onLogoutClicked}
            type="button"
          >
            <BiSolidExit />
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)

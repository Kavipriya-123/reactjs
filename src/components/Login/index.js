import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  getSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  getFailureView = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      this.getSuccess(jsonData.jwt_token)
    } else {
      this.getFailureView(jsonData.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isError, errorMsg} = this.state
    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.formSubmitted} className="login-form">
            <label htmlFor="name">USERNAME</label>
            <br />
            <input
              onChange={this.onChangeUsername}
              id="name"
              value={username}
              type="text"
              placeholder="Username"
            />
            <br />
            <br />
            <label htmlFor="pass">PASSWORD</label>
            <br />
            <input
              onChange={this.onChangePassword}
              id="pass"
              value={password}
              type="password"
              placeholder="Password"
            />
            <br />
            <br />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login

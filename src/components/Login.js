import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearAuthState } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));

      this.setState({
        email: '',
        password: '',
      });
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { inProgress, error, isLoggedin } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isLoggedin) {
      return <Redirect to={from} />;
    }
   
    return (
      <form className='login-form'>
        <span className='login-signup-header'>Log In</span>
        {error && <div className='alert error-dailog'>{error}</div>}
        <div className='field'>
          <input
            type='email'
            placeholder='Email'
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className='field'>
          <input
            type='password'
            placeholder='Password'
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className='field'>
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);

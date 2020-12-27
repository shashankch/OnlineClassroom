import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

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

  componentDidUpdate() {
    if (this.props.auth.isLoggedin) {
      this.props.history.push('/');
    }
  }

  render() {
    const { inProgress, error } = this.props.auth;
    console.log('are baba yeh props:', this.props);
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

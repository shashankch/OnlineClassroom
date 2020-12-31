import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/auth';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  render() {
    const { auth } = this.props;
    console.log('auth***', auth);
    return (
      <nav className='nav'>
        <div className='right-nav'>
          <div className='nav-links'>
            <ul>
              <Link to='/'>
                <span className='brand'>E-Learning</span>
              </Link>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='right-nav'>
          {auth.isLoggedin && (
            <div className='user'>
              <img
                src='https://www.flaticon.com/svg/static/icons/svg/847/847969.svg'
                alt='user-dp'
                id='user-dp'
              />

              <div className='nav-links'>
                <ul>
                  <li>
                    <Link to='/profile'>{auth.user.name}</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className='nav-links'>
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to='/login'>Log-in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log-out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to='/signup'>Create-account</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);

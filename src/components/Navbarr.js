import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/auth';
import { Navbar, Nav } from 'react-bootstrap';

class Navbarr extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  render() {
    const { auth } = this.props;

    return (
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>
          <Link to='/'>E-Learning</Link>
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link>
            <Link to='/'>Home</Link>
          </Nav.Link>
        </Nav>
        <Nav className='ml-auto'>
          {auth.isLoggedin && (
            <Nav.Link>
              <img
                src='https://www.flaticon.com/svg/static/icons/svg/847/847969.svg'
                alt='user-dp'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />

              <Link to='/profile'>{auth.user.name}</Link>
            </Nav.Link>
          )}

          {!auth.isLoggedin && (
            <Nav.Link>
              <Link to='/login'>Log-in</Link>
            </Nav.Link>
          )}

          {auth.isLoggedin && (
            <Nav.Link onClick={this.logOut}>Log-out</Nav.Link>
          )}

          {!auth.isLoggedin && (
            <Nav.Link>
              <Link to='/signup'>Create-account</Link>
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbarr);

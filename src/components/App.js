import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Navbar, Page404, Login, Signup } from './';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path='/'
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />

            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(App);

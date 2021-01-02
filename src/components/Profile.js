import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, clearAuthState } from '../actions/auth';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      password: '',
      editMode: false,
    };
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  handleSave = () => {
    const { password, name } = this.state;
    const { user } = this.props.auth;
    if (name && password) {
      this.props.dispatch(editUser(name, password, user._id));
    }

    this.setState({ editMode: false, name: name, password: '' });
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  render() {
    const { user, error, success } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className='settings'>
        <div className='img-container'>
          <img
            src='https://www.flaticon.com/svg/static/icons/svg/3237/3237472.svg'
            alt='user-dp'
          />
        </div>
        {error && <div className='alert error-dailog'>{error}</div>}
        {success && <div className='alert success-dailog'>{success}</div>}
        <div className='field'>
          <div className='field-label'>Email</div>
          <div className='field-value'>{user.email}</div>
        </div>
        <div className='field'>
          <div className='field-label'>Name</div>
          {editMode ? (
            <input
              type='text'
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className='field-value'>{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className='field'>
            <div className='field-label'>New Password</div>
            <input
              type='password'
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            />
          </div>
        )}

        <div className='btn-grp'>
          {editMode ? (
            <button
              className='button save-btn'
              onClick={() => this.handleSave()}
            >
              Save
            </button>
          ) : (
            <button
              className='button edit-btn'
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit profile
            </button>
          )}

          {editMode && (
            <div
              className='go-back'
              onClick={() => this.handleChange('editMode', false)}
            >
              Go back
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Profile);

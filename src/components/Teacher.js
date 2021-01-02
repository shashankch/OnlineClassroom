import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAssignments,
  create,
  getmyAssignments,
} from '../actions/assignment';
import { AssignmentStatus } from './';
class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }
  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;

    if (title && description) {
      this.props.dispatch(create(title, description, this.props.auth.user._id));
    }
    this.setState({
      title: '',
      description: '',
    });
  };

  componentDidMount() {
    this.props.dispatch(getAssignments());
    this.props.dispatch(getmyAssignments(this.props.auth.user._id));
  }

  render(props) {
    const { assignments, filteredAssign } = this.props.assignments;

    const { success } = this.props;
    const { user } = this.props.auth;
    console.log('userid', user._id);
    return (
      <div>
        {success && <div>{success}</div>}
        <form className='login-form'>
          <span className='login-signup-header'>Create Assignment</span>

          <div className='field'>
            <input
              type='text'
              placeholder='Title'
              required
              onChange={(e) => this.handleChange('title', e.target.value)}
              value={this.state.title}
            />
          </div>
          <div className='field'>
            <textarea
              placeholder='Description'
              required
              onChange={(e) => this.handleChange('description', e.target.value)}
              value={this.state.description}
            />
          </div>
          <div className='field'>
            <button onClick={this.onFormSubmit}>Create</button>
          </div>
        </form>
        <ul>
          {filteredAssign.map((assign) => {
            return (
              <li>
                <div>Title: {assign.title}</div>
                <div>Description: {assign.description}</div>
                <div>
                  <AssignmentStatus assign={assign} />
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    assignments: state.assignment,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Teacher);

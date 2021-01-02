import React, { Component } from 'react';
import { getAssignments, submit } from '../actions/assignment';
import { connect } from 'react-redux';
class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
    };
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onClickHandler = (e, aid) => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('aid', aid);
    this.props.dispatch(submit(data));
  };
  componentDidMount() {
    this.props.dispatch(getAssignments());
  }

  render(props) {
    console.log('this.state&&&&&', this.state);
    return (
      <div>
        <ul>
          <h3>upcoming Assignments</h3>
          {this.props.assignments.assignments.map((assign) => {
            return (
              <li>
                <div>Title: {assign.title}</div>
                <div>Description: {assign.description}</div>
                <div>
                  <input
                    type='file'
                    name='file'
                    onChange={this.onChangeHandler}
                  />
                  <button onClick={(e) => this.onClickHandler(e, assign._id)}>
                    Upload
                  </button>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Submitted Assignments</h3>
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
export default connect(mapStateToProps)(Student);

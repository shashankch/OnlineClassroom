import React, { Component } from 'react';
import { getAssignments, submit } from '../actions/assignment';
import { connect } from 'react-redux';
import { Grade } from './';
class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      submit: [],
      notsubmit: [],
    };

    this.handleFilter();
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onClickHandler = (e, aid) => {
    if (this.state.selectedFile !== null) {
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      data.append('aid', aid);
      this.props.dispatch(submit(data));
    }
  };

  handleFilter = () => {
    console.log('this.props&&', this.props);
    let self = this;
    this.setState({
      submit: null,
      notsubmit: null,
    });
    let sub = [];
    let not = [];
    let all = this.props.assignments.assignments;
    console.log('allwale', all);
    all.forEach(function (item) {
      let flag = false;
      for (let i = 0, len = item.students.length; i < len; i++) {
        // console.log('subi', item);
        if (item.students[i].id._id === self.props.auth.user._id) {
          sub.push(item);
          flag = true;
        }
      }
      if (!flag) {
        not.push(item);
      }
    });
    console.log('sub', sub);
    console.log('not', not);
    this.setState({
      submit: sub,
      notsubmit: not,
    });
  };

  componentDidMount() {
    this.props.dispatch(getAssignments());
    this.handleFilter();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.handleFilter();
    }
  }

  render(props) {
    console.log('this.state&&&&&', this.state);
    const { notsubmit, submit } = this.state;
    console.log('submit', submit);
    return (
      <div>
        <ul>
          <h3>upcoming Assignments</h3>
          {notsubmit.map((assign) => {
            console.log('assign:::', assign);
            return (
              <li>
                <div>Title: {assign.title}</div>
                <div>Description: {assign.description}</div>
                <div>Teacher Name: {assign.owner.name}</div>
                <div>Teacher Email: {assign.owner.email}</div>
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
                <div>
                  <Grade assign={assign} user={this.props.auth.user._id} />
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Submitted Assignments</h3>
          {submit.map((assign) => {
            console.log('assign:::', assign);
            return (
              <li>
                <div>Title: {assign.title}</div>
                <div>Description: {assign.description}</div>
                <div>Teacher Name: {assign.owner.name}</div>
                <div>Teacher Email: {assign.owner.email}</div>
                <div>
                  <Grade assign={assign} user={this.props.auth.user._id} />
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
export default connect(mapStateToProps)(Student);

import React, { Component } from 'react';
import {
  getAllStudents,
  evaluate,
  getAssignments,
} from '../actions/assignment';
import { connect } from 'react-redux';
class AssignmentStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: [],
      notsubmit: [],
      grade: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudents());
    this.props.dispatch(getAssignments());
    this.handleFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.handleFilter();
    }
  }
  // element.id._id !== student._id;   sub all
  handleFilter = () => {
    console.log('this.props&&', this.props);
    this.setState({
      submit: null,
      notsubmit: null,
    });
    let sub = this.props.assign.students;
    let all = this.props.assignment.students;

    all = all.filter(function (item) {
      for (var i = 0, len = sub.length; i < len; i++) {
        console.log('subi', item);
        if (sub[i].id._id === item._id) {
          return false;
        }
      }
      return true;
    });

    console.log('all', all);
    this.setState({
      submit: sub,
      notsubmit: all,
    });
  };

  handleInputChange = (value, sid, aid) => {
    this.setState({
      grade: value,
    });
    if (value && sid && aid) {
      this.props.dispatch(evaluate(aid, sid, value));
    }
  };

  render(props) {
    console.log('yeh dekhna', this.props);
    return (
      <div>
        <div>
          <h3>Submitted Students: </h3>
          <ul>
            {this.state.submit.map((std) => {
              return (
                <li>
                  <div>
                    <div>Name:{std.id.name}</div>
                    <div>EmailId: {std.id.email}</div>
                    <div>
                      File uploaded:
                      <a
                        href={'http://localhost:8000' + std.upload}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Link
                      </a>
                    </div>
                    <select
                      required
                      onChange={(e) =>
                        this.handleInputChange(
                          e.target.value,
                          std.id._id,
                          this.props.assign._id
                        )
                      }
                      value={std.status}
                    >
                      <option value='' selected>
                        Evaluate
                      </option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                    </select>
                  </div>
                  <div>{std.name}</div>
                  <div>{std.email}</div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3>Not Submitted Students: </h3>
          <ul>
            {this.state.notsubmit.map((std) => {
              return (
                <li>
                  <div>Name:{std.name}</div>
                  <div>EmailId: {std.email}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    assignment: state.assignment,
  };
}
export default connect(mapStateToProps)(AssignmentStatus);

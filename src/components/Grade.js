import React, { Component } from 'react';

class Grade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: 'Not Submitted',
    };
  }

  componentDidMount() {
    this.checkEvaluation();
  }

  checkEvaluation = () => {
    this.props.assign.students.forEach((student) => {
      if (this.props.user === student.id._id) {
        console.log('yeh to inside h', student.status);
        this.setState({
          grade: student.status,
        });
      }
    });
  };

  render(props) {
    return <div>Status: {this.state.grade}</div>;
  }
}

export default Grade;

import React, { Component } from 'react';

class Teacher extends Component {
  render() {
    return (
      <div>
        <form className='login-form'>
          <span className='login-signup-header'>Create Assignment</span>

          <div className='field'>
            <input type='text' placeholder='Title' required />
          </div>
          <div className='field'>
           <textarea placeholder='Description'  required />
          </div>
          <div className='field'>
            <button>Create</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Teacher;

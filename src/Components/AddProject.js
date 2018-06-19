import PropTypes from 'prop-types';
import React, { Component } from 'react';

import uuid from 'uuid';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    categories: ['Web Design', 'Mobile Development', 'Web Development']
  }

  handleSubmit(e) {
    if (this.refs.title.value === '') {
      alert('Title is required.');
    }
    else {
      this.setState({
        newProject: {
          title: this.refs.title.value,
          category: this.refs.category.value
        }
      }, function () {
        this.props.addProject(this.state.newProject);
      })
    }
    e.preventDefault();
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    return (
      <div className="AddProject">
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Category</label><br />
            <select type="text" ref="category">
              {categoryOptions}
            </select>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func,
  categories: PropTypes.array
}

export default AddProject;

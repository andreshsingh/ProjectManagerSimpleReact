import React, { Component } from 'react';

import uuid from 'uuid';
import axios from 'axios';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'E-commerce Shopping Cart',
          category: 'Web Development'
        },
      ]
    })
    this.getProjects()
  }

  getProjects() {
    axios.get(`http://127.0.0.1:3001/projects.json`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/jsonp'
      },
      mode: 'no-cors'
    })
      .then(res => {
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getProjects()
  }

  hanldeAddProject(project) {
    this.postProject(project);
  }

  postProject(project) {
    axios.post(`http://127.0.0.1:3001/projects.json`, {
      title: project.title,
      category: project.category
    })
      .then(res => {
        let projects = this.state.projects;
        let project = res.data
        projects.push(project);
        this.setState({ projects })
      })
      .catch(err => {
        console.log(err);
      })
  }

  onDelete(id) {
    axios.delete(`http://127.0.0.1:3001/projects/` + id + `.json`)
      .then(res => {
        console.log(res.data);
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <h2>First React App</h2>
        <Projects projects={this.state.projects} onDelete={this.onDelete.bind(this)} />
        <AddProject addProject={this.hanldeAddProject.bind(this)} />
      </div>
    );
  }
}

export default App;

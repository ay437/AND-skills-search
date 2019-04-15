import React, { Component } from 'react'

const API_URL = 'http://localhost:8080/searchByPrediction/'

class Search extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    query: '',
    results: {}
  };

  this.handleInputChange = this.handleInputChange.bind(this);
}


  getInfo = () => {
    const response = fetch('{API_URL}&prefix=${this.state.query}');
    const body = response.json();
    this.setState({ results: body });
  } 

  submitForm = (e) => {
    e.preventDefault();

    this.props.handleData(this.state)
  } 


  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 3) {

          this.getInfo()
      } 
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <button type="submit" value="Submit" onClick={this.submitForm}>Submit</button> 
      </form>
    )
  }
}

export default Search







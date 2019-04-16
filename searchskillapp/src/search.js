import React, { Component } from 'react';

const API_URL = 'http://localhost:8080/searchByPrediction/';

class Search extends Component {
 constructor(props) {
 super(props);
 this.state = {
   query: '',
   results: {}
 };

 this.handleInputChange = this.handleInputChange.bind(this);
 this.submitForm = this.submitForm.bind(this);
}


 getInfo = () => {
   const response = fetch('API_URL');
   const body = response.json();
   this.setState({ results: body });
 }

 handleInputChange = (e) => {
   this.setState({
     query: e.target.value
   })
 }

 submitForm = (e) => {
   e.preventDefault();
   let querySearch = "http://localhost:8080/search/" + this.state.query
   fetch(querySearch)
   .then(response => {
     return response.json();
   })
   .then(data => {
     this.setState({
       results: data
     })
   })
 }

 render() {
   return (
     <form onSubmit={this.submitForm}>
       <input
         placeholder="Search for..."
         value={this.state.query}
         onChange={this.handleInputChange}
       />
       <p>{this.state.query}</p>
       <button type="submit" value="Submit" >Submit</button>
       <p>{}</p>
     </form>
   )
 }
}

export default Search

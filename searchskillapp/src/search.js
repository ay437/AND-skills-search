import React, { Component } from 'react';

const API_URL = 'http://localhost:8080/search/';

class Search extends Component {
 constructor(props) {
 super(props);
 this.state = {
   query: '',
   results: []
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
   let querySearch = API_URL + this.state.query
   fetch(querySearch)
   .then(response => {
     return response.json();
   })
   .then(data => {
    console.log(data);
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
       <button type="submit" value="Submit" >Submit</button>
          <table className="pure-table">
          <thead>
           <tr>
             <th>Client</th>
             <th>Industry</th>
             <th>Project</th>
             <th>Capability</th>
             <th>Engagament Type</th>
             <th>Service Owner</th>
             <th>PDL</th>

           </tr>
          </thead>
          <tbody>
          {this.state.results.map(result => {
            return (
            <tr key={result.clientEngagementId}>
             <td>{result.clientName}</td>
             <td>{result.industry}</td>
             <td>{result.projectName}</td>
             <td>{result.capability}</td>
             <td>{result.engagementType}</td>
             <td>{result.serviceOwner}</td>
             <td>{result.pdl}</td>

            </tr>
            )
            })
           }
          </tbody>
         </table>
     </form>
   )
 }
}

export default Search

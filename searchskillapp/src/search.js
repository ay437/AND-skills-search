import React, { Component } from 'react';

const API_URL = 'http://localhost:8080/search/';

class Search extends Component {
 constructor(props) {
 super(props);
 this.state = {
   query: '',
   results: [],
   errorTxt: '',
   isValidTxt: true
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
  let errorTxt = this.state.errorTxt; 
  this.setState({
     query: e.target.value
   })
   this.setState({errorTxt});
 }

 submitForm = (e) => {
  e.preventDefault();
   if(this.validateFormInput()) { 
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
 }

 validateFormInput(){
  let textFieldValue = this.state.query;
  this.state.isValidTxt = true;
  this.setState({"errorTxt" :  ""});

  if(!textFieldValue.match(/^[a-zA-Z0-9]*$/)) {
    this.state.isValidTxt = false;
    this.setState({"errorTxt" :  "*Please enter alphanumeric characters only."});
  }
  return this.state.isValidTxt;
 }

 render() {
   const { results } = this.state;
  
   return (
     <form onSubmit={this.submitForm}>
      <div className="search-box">
       <img className="magnifying-glass" src={require('./images/magnifying-glass.png')}></img> 
       <input
         placeholder="Search for..."
         value={this.state.query}
         onChange={this.handleInputChange}
         name="inputSearchTxt"
       /> 
       <button type="submit" value="Submit" >Search</button>
       <div className="errorMsg">{this.state.errorTxt}</div>
      </div>
         { this.state.isValidTxt ? results.hasOwnProperty('errorMessage') ? <p><h4> {results.errorMessage}</h4></p> :
         <div className="table-responsive">
          <table className="pure-table table">
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
          {    
            results.map(result => {
            return (
            <tr key={result.clientEngagementId}>
             <td>{result.clientName}</td>
             <td>{result.industry}</td>
            <td>{result.link===""? result.projectName : <a href={result.link} target="_blank">{result.projectName}</a> } </td>
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
         </div>
         :<pr></pr> 
        }
     </form>
   )
 }
}


export default Search

import React, { Component } from 'react';
import logo from './logo.svg';
import Search from './search';
import './App.css';
import './css/pure-min.css';

class App extends Component {
  state = {
    isLoading: true,
    groups: {}
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/search');
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
  }

  render() { 
    const {groups, isLoading} = this.state;
    console.log(groups);
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          < Search />
          <div className="App-intro"> 
                  <table class="pure-table">
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
                   {groups.map(group => {
                     return (
                     <tr key={group.clientEngagementId}>
                      <td>{group.clientName}</td>
                      <td>{group.industry}</td>
                      <td>{group.projectName}</td>
                      <td>{group.capability}</td>
                      <td>{group.engagementType}</td>
                      <td>{group.serviceOwner}</td>
                      <td>{group.pdl}</td>

                     </tr>
                     )
                     })
                    }
                   </tbody>
                  </table>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
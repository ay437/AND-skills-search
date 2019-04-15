import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/pure-min.css';

class App extends Component {
  state = {
    isLoading: true,
    groups: {}
  };

  async componentDidMount() {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
    console.log(body);
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro"> 
                  <table class="pure-table">
                   <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>City</th>
                    </tr>
                   </thead>
                   <tbody>
                   {groups.results.map(group => {
                     return (
                     <tr key={group}>
                      <td>{group.name.first}</td>
                      <td>{group.name.last}</td>
                      <td>{group.location.city}</td>
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
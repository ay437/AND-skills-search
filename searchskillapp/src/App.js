import React, { Component } from 'react';
import Search from './search';
import './App.css';
import './css/pure-min.css';

class App extends Component {
  state = {
    groups: {}
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/search');
    const body = await response.json();
    this.setState({ groups: body });
  }

  render() { 
    const {groups} = this.state;
    console.log(groups);

    return (
      <div className="App">
        <header className="App-header">
          < Search />
          <div className="App-intro"> 
              
          </div>
        </header>
      </div>
    );
  }
}

export default App;
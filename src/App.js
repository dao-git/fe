import React, { Component } from 'react';
import Fortmatic from 'fortmatic';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import '@babel/polyfill/noConflict';
let fm = new Fortmatic('pk_test_53D49050103F2885');
let web3 = new Web3(fm.getProvider());

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

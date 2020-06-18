import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/home" component={Home} exact/>
            <Route path="/about" component={About}/>
            <Route component={ Error }/>
          </Switch>
      </div> 
    </BrowserRouter>
  );
}

export default App;
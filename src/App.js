import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Category from './pages/Category/Category';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import IndividualUser from './pages/IndividualUser/IndividualUser';
import User from './pages/User/User';
import Search from './pages/Search/Search';

class App extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        categories: ['scenic', 'architecture', 'animals', 'aerial', "food", "portrait", "fashion", "activity", "art"],
      }

    }
  
  render() {

    const CategoryType = ({ match }) => {
      return (
        <Category category={match.params.category} /> 
        )
    }

    const AuthorPage = ({ match }) => {
      return (
        <IndividualUser author={match.params.authorId} /> 
        )
    }

    const SearchPage = ({ match }) => {
      return (
        <Search query={match.params.query} /> 
        )
    }

    return (
      <div className="App">
        <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/category/:category" component={CategoryType} />} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/user" component={User} />
              <Route path="/author/:authorId" component={AuthorPage} />
              <Route path="/search/:query" component={SearchPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Router>
      </div>
    );
  }
}




export default App;

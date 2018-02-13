import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { Login, Register } from './components/auth';

const MainRoutes = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
  </Switch>
)
const Header = () => (
  <header className="App-header">
    <Link to='/'><h1 className="App-title">New game</h1></Link>
    <h1 className="App-title">Tic-tac-toe by default react template</h1>
    <Link to='/login'><button className="btn btn-primary auth-btn">Login</button></Link>
    <Link to='/register'><button className="btn btn-primary auth-btn">Register</button></Link>
  </header>
  )

class App extends Component {
  render() {
    return (
    <Router>
        <div className="App">
          <Header/>             
          <MainRoutes/>   
        </div>
    </Router>
    );
  }
}

export default App;

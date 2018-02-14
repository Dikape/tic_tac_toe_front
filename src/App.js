import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';


const MainRoutes = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <Route path="/logout" component={Logout} />
  </Switch>
)
class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      'username': sessionStorage.getItem('user_name'),
    }
  }
  render() {
  const { username } = this.state;
  let start_game = username? 'New game': '';
  let auth_buttons;
  if (username){
    auth_buttons = (
      <Link to='/logout'><button className="btn btn-primary auth-btn">Logout</button></Link>
    );
  }
  else{
    auth_buttons = (
      <div>
        <Link to='/login'><button className="btn btn-primary auth-btn">Login</button></Link>
        <Link to='/register'><button className="btn btn-primary auth-btn">Register</button></Link>
      </div>
    );
  }
  
  return (
      <header className="App-header">
        <Link to='/'><h1 className="App-title">{start_game}</h1></Link>
        <h1 className="App-title">Tic-tac-toe by default react template</h1>
        <h2>{username}</h2>
        <div>{auth_buttons}</div>
      </header>
    )
  }
}

class App extends Component {

  render() {
    return (
    <Router>
      <div className="App">
        <Header/>   
        <div className='container'>          
          <MainRoutes  />   
        </div>
      </div>
    </Router> 
    );
  }
}

export default App;

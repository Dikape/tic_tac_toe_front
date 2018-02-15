import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
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


function Header() {
  let auth_buttons;
  const username = sessionStorage.getItem('user_name');
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
      <Link to='/'><h1 className="App-title">Tic-tac-toe by default react template</h1></Link>
      
      <div>{auth_buttons}</div>
    </header>
  )
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

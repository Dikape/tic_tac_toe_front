import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import CreateGame from './components/CreateGame';
import Game from './components/GameHotSeat';
import OnlineGame from './components/GameOnline';
import ChooseGame from './components/ChooseGame';


function MainRoutes(props){
    const user_name = localStorage.getItem('user_name');
    if (user_name){
      return(
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/create_game" component={CreateGame} />
          <Route path="/choose_game" component={ChooseGame} />
          <Route path="/hot_seat" component={Game} />
          <Route path="/online" component={OnlineGame} />
        </Switch>
      )
    }else{
      return(
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      )
    }
}


function Header() {
  let auth_buttons;
  const username = localStorage.getItem('user_name');
  if (username){
    auth_buttons = (
      <div>
        <Link to='/'>{username}</Link>
        <Link to='/logout'><button className="btn btn-primary auth-btn">Logout</button></Link>
      </div>
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
            <MainRoutes />
        </div>
      </div>
    </Router> 
    );
  }
}

export default App;

import React, { Component } from 'react';
import { login, getUser } from '../helpers/auth_api.js'
import { Redirect } from "react-router-dom";

export default class Login extends Component{
  constructor(props){
  	super(props);
  	this.state = {
  	  username: '',
  	  password: '',
  	  error_msg: '',
  	  redirect: false
  	}
  }
  getUserInfo(access_token){
    let user_response = getUser(access_token)
    user_response.then(
      (response) =>{
        let data = response.data;
        sessionStorage.setItem('user_name', data.username);
        sessionStorage.setItem('user_id', data.id);
        this.setState({
          redirect: true
        });
      },
      (error) => {
        let data = error.response.data;
        this.setState({
          error_msg: data.description,
          username: '',
          password: '',
        });
    })
  }
  handleSubmit(){
  	const { username, password }= this.state;
  	if (username.length > 2  && password.length > 2)
    {
	  	let login_response = login(username, password);
	  	login_response.then((response) => {
	  		let data = response.data;
	  		sessionStorage.setItem('acces_token', data.access_token);
	  		this.getUserInfo(data.access_token);
	  	},
	  	(error) => {
	  		let data = error.response.data;
		  	this.setState({
		      error_msg: data.description,
		      username: '',
					password: '',
		    });
	  	})
  	}
    else{
      this.setState({
          error_msg: 'Username and password must be more than 2 symbols.'
        });
    }
  }

  handleFieldChange(event){
  	const target = event.target;
  	const value = target.value;
  	const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
  	const {error_msg, redirect} = this.state;
  	if (redirect) {
  		return <Redirect to='/'/>;
  	}
  	return (	
  	  <div className='form-group'>
	      <form >
	    		<h1>Login</h1>
	      	<p className='error-msg'>{error_msg}</p>
	      	
		      <div className="row">
		        <label>
		          Username:
		          <input type="text" 
		          name='username'
		          className="form-control" 
		          value={this.state.username} 
		          onChange={(event) => this.handleFieldChange(event)} />
		        </label>
	        </div>
	        <div className="row">
		        <label>
		          Password:
		          <input type="password" 
		          className="form-control" 
		          name='password'
		          value={this.state.password} 
		          onChange={(event) => this.handleFieldChange(event)} />
		        </label>
		      </div>
		      <div className="row">
	        	<input type="button" className="btn btn-success" value="Submit" onClick={() => this.handleSubmit()}/>
	        </div>
	      </form>
      </div>
  	)
  }
}
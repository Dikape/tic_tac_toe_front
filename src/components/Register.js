import React, { Component } from 'react';
import { register } from '../helpers/auth_api.js'
import { Redirect } from "react-router-dom";

export default class Register extends Component{
  constructor(props){
  	super(props);
  	this.state = {
  	  username: '',
  	  password: '',
      confirm_password: '',
      passwords_equal: false,
  	  error_msg: '',
  	  redirect: false
  	}
  }
  handleSubmit(){
  	const { username, password, confirm_password }= this.state;
    if (username.length > 2  && password.length > 2)
    {
      if (password===confirm_password){
        const response = register(username, password);
        console.log('handleSubmit');
        response.then((response) => {
          const data = response.data;
          sessionStorage.setItem('access_token', data.access_token);
          sessionStorage.setItem('user_name', data.username);
          sessionStorage.setItem('user_id', data.id);
          this.setState({
            redirect: true
          });
        },
        (error) => {
          const data = error.response.data;
          this.setState({
            error_msg: data.message,
            username: '',
            password: '',
          });
        })
      }
      else{
        this.setState({
          error_msg: 'Confirmation and password does not equal.'
        });
      }

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
	    		<h1>Registration</h1>
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
            <label>
              Confirm password:
              <input type="password" 
              className="form-control" 
              name='confirm_password'
              value={this.state.confirm_password} 
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


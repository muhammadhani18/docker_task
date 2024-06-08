import { useState,useRef } from 'react';
import LandingPage from './LandingPage';
import ErrorPage from './ErrorPage';
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    const userEmail = email.current.value
    const userPass = password.current.value

    const userData = {
      "email":userEmail,
      "password":userPass
    };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(res => {
      if(res.status === 200) {
        navigate('/')
      } else {
        navigate("/error")
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  
  return (
    <div class="container">
      <div>
        <h1>
          Login Form
        </h1>
      </div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={email}/>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" ref={password}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={loginHandler}>Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;

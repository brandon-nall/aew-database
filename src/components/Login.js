import React, { useState } from 'react';
import Axios from 'axios';

const Login = ({ login, auth, logout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submitLogin = (ev) => {
    ev.preventDefault();
    setUsername(username.toLowerCase());
    login({ username, password }).catch((ex) =>
      setError(ex.response.data.message)
    );
  };

  return (
    <div id="login">
      <h1>Login</h1>
      {!auth && (
        <form id="loginForm" onSubmit={submitLogin}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button type="submit">Login</button>
        </form>
      )}
      {auth && <button onClick={logout}>Log Out</button>}
    </div>
  );
};

export default Login;

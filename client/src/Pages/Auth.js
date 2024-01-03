import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Auth() {

  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookies] = useCookies('access_token');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', { username, password });
      alert("logged in");
      setCookies('access_token', res.data.token);
      window.localStorage.setItem('userID', res.data.userID);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form label={'Login'} username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={onSubmit} />
  )
}

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', { username, password });
      alert("registered, now log in");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form label={'Register'} username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={onSubmit} />
  )
}

const Form = ({ label, username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <div className='auth-container'>
      <h2>{label}</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit'>{label}</button>
      </form>
    </div>
  )
}
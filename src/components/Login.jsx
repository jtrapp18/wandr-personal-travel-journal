import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllUsers } from '../helper';

const LoginContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  display: flex;
  position: absolute;
  top: 100px;
  width: 50%;
  min-width: 400px;
  max-width: 500px;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  button:hover {
    background-color: var(--navy);
    color: var(--gray);
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: var(--green);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Login = ({ onLogin }) => {
  const [userList, setUserList] = useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users);
    });
  }, [userList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // do we need to do some sort of fetch request and update the db.json to include users?
    if (email && password) {
      const user = userList.find(user => user.username === email)
      onLogin({ email, id: user.id });
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
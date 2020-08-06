import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './common';

function Register(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const email = useFormInput('');
  const phonenumber = useFormInput('');
  const person = useFormInput('');
  const password = useFormInput('');
  const repeatPassword = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleRegister = () => {
    setError(null);
    setLoading(true);
    axios.post('api/register', 
    { 
        username: username.value,
        email: email.value,
        phonenumber: phonenumber.value,
        password: password.value,
        person: person.value

    }).then(response => {
      setLoading(false);
    //   setUserSession(response.data.token, response.data.user);
    console.log(response);
      props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Register<br /><br />
      <div>
      username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
      email<br />
        <input type="email" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
      phonenumber<br />
        <input type={Number} {...phonenumber} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
      person<br />
        <input type="text" {...person} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
      repeatPassword<br />
        <input type="password" {...repeatPassword} autoComplete="new-password" />
      </div>
      {error && <div><small style={{ color: 'red' }}>{error}</small><br /></div>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Register;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { setUserSession } from './common';
import RCG from 'react-captcha-generator';


function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [captcha, setCaptcha] = useState('');
  const [captchaEnter, setCaptchaEnter] = useState('');
  

  const result = (text) => {
    setCaptcha({
      captcha: text
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    console.log("captchaEnter", captchaEnter);
    console.log("captcha", captcha.captcha);
    if(captcha.captcha == captchaEnter)
    {
    setLoading(true);
    
  axios.post('api/login', { email: email.value, password: password.value }).then(response => {
   if(response.status === 201){
   
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
   
    
   }
    
  }).catch(error => {
    setLoading(false);
    if (error.response.status === 401) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
  });
}else {"Something went wrong."}
    
  }

  return (
    <div style={{margin:"20px"}}>
      <form >
      Login<br /><br />
      <div>
      email<br />
        <input type="email" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <div><small style={{ color: 'red' }}>{error}</small><br /></div>}<br />
      
        
          <input type='text' className={'xxx'} onChange={(e) => {setCaptchaEnter(e.target.value)}}/>
         
       
        <RCG result={result} />
     
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </form></div>
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

export default Login;
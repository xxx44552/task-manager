import React, {useState} from 'react';

export default function Login(props) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function reg(e) {
    e.preventDefault();
    console.log(email, password);
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json())
      .then(data => {
        localStorage.setItem('tokenApi', data.token);
        console.log(data)
        if(data.redirect) {
          props.history.push(`${data.redirectUrl}`);
        }
      })
      .catch(e=>console.log(e))
  }

  return (
      <form onSubmit={e=>reg(e)}>
        <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
        <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='Пароль'/>
        <input type='submit' value='Отправить'/>
      </form>
  );
}

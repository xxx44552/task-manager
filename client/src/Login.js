import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

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
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to={'/restore'}>Забыли пароль?</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/reg'}>Регистрация</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <form className={'login-form'} onSubmit={e=>reg(e)}>
          <h5>Авторизация</h5>
          <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
          <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='Пароль'/>
          <input className={'btn btn-primary'} type='submit' value='Отправить'/>
        </form>


      </>
  );
}

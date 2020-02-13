import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

export default function Restore() {

  const [email, setEmail] = useState(null);

  function res(e) {
    e.preventDefault()
    const data = {email}
    fetch('/restore', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }}).then(()=>console.log(JSON.stringify(data)))
  }

  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={'/login'}>Авторизироваться</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/reg'}>Регистрация</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <form className={'login-form'} onSubmit={res}>
          <h5>Восстановление пароля</h5>
          <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
          <input className={'btn btn-primary'} type='submit' value='Отправить'/>
        </form>
      </>
  );
}

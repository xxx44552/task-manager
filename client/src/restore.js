import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

export default function Restore() {

  const [email, setEmail] = useState(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [error, setError] = useState(false);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);


  function res(e) {
    e.preventDefault();
    if(!validateEmail(email)) {
      setError('Неверная почта');
      return
    }
    const data = {email}
    fetch('/restore', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }}).then(res=> res.json()).then(data => data.check ? setCheckEmail(true) : setError(data.error))
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
        {
          checkEmail ?
              <h3 className={'check-email'}>Проверьте почту</h3>
              :
              <form className={'login-form'} onSubmit={res}>
                <h5>Восстановление пароля</h5>
                {error?<span style={{"fontSize": "12px", "color": "red"}}>{error}</span>:null}
                <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
                <input className={'btn btn-primary'} type='submit' value='Отправить'/>
              </form>
        }
      </>
  );
}

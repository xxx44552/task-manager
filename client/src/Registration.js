import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';


export default function Registration() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  function reg(e) {
    e.preventDefault();
    console.log(name, age, email, password)
    fetch('/registration', {
      method: 'post',
      body: JSON.stringify({userName: name, age, email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then( res => res.json())
        .then(data => {
          localStorage.setItem('tokenApi', data.token);
          if(data.redirect) {
            history.push('/');
          }
        })
        .catch(e=>console.log(e))
  }

  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={'/login'}>Авторизироваться</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <form className={'login-form'} onSubmit={e=>reg(e)}>
          <h5>Регистрация</h5>
          <input type='text' name='userName' onChange={e=>setName(e.target.value)} placeholder='Имя'/>
          <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
          <input type='number' name='age' onChange={e=>setAge(e.target.value)} placeholder='Возраст'/>
          <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='Пароль'/>
          <input className={'btn btn-primary'} type='submit' value='Отправить'/>
        </form>

      </>
  );
}

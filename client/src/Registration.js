import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';


export default function Registration() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const [error, setError] = useState(null);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  function reg(e) {
    e.preventDefault();
    console.log(name, age, email, password)

    !name || name.length < 5 ? setError('Имя должно быть больше 5 символов') : console.log(name);
    !age || age.length < 1 && age.length > 150 ? setError('Возраст от 1 до 150') : console.log(age);
    !password || password.length < 7 ? setError('Пароль должен быть не менее 7 символов') : console.log(password);
    (!validateEmail(email)) ? setError('Неверная почта') : console.log(email);

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
          <h5>Регистрация</h5> {error ? <span className={'small'} style={{'color': 'red'}}>{error}</span>:null}
          <input type='text' name='userName' onChange={e=>setName(e.target.value)} placeholder='Имя'/>
          <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
          <input type='number' name='age' onChange={e=>setAge(e.target.value)} placeholder='Возраст'/>
          <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='Пароль'/>
          <input className={'btn btn-primary'} type='submit' value='Отправить'/>
        </form>

      </>
  );
}

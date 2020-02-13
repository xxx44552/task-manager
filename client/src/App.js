import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import TaskManager from "./taskManager";
import Confirm from "./confirmEmail";
import { useHistory } from 'react-router-dom';
import Chat from "./Chat";
import Logout from "./logout";
import Loader from "./loader";


export default function App() {

  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(true);
  const token = localStorage.getItem('tokenApi');

  useEffect(() => {
    if(token) {
      fetch('/api', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then( res => res.json()).then(data => {
        if(data.user) {
          setUser(data.user);
          setIsLoader(false);
        }else if(data.error) {
          history.push('/login')
        }
      })
    }else {
      history.push('/login')
    }

  }, []);

  return (
      <>
        {
          isLoader ?
          <Loader/>
          :
          <div className='wrap'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <div className="container">
                 <ul className="navbar-nav mr-auto">
                   <li className="nav-item active">
                     <a href='#' className="nav-link">Главная</a>
                   </li>
                   <Logout/>
                 </ul>
               </div>
              </div>
            </nav>
            <div className="container">
              {user.confirm ? user.confirm.status ? null : <Confirm/> : null}
              <div className="row">
                <TaskManager/>
                <div className="col-3">
                  <div className="card" style={{"width": "250px"}}>
                    <img  src={`/user/${user._id}/avatar`} className="card-img-top" alt="avatar"/>
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                      <p className="card-text">Возраст: {user.age}</p>
                      <p className="card-text">Почта: {user.email}</p>
                      <NavLink className="btn btn-primary" exact to="/edit">Редактировать</NavLink>
                    </div>
                  </div>
                  <Chat user={user}/>
                </div>
              </div>
            </div>
          </div>
        }
      </>
  );
}

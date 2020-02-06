import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom'
import Login from "./Login";
import CreateTask from "./createTask";
import Confirm from "./confirmEmail";
import Edit from "./editUser";
import Chat from "./Chat";


export default function App() {

  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('tokenApi')) {
      const token = localStorage.getItem('tokenApi');
      console.log(token)
      fetch('/api', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then( res => res.json()).then(data => {
        setUser(data.user);
      })
    }else {
      setStatus(true)
    }

  }, []);

  return (
      <>
        {
          status ?
              <Login/>
              :
              <div className='wrap'>
                {user.confirm ? user.confirm.status ? null : <Confirm/> : null}
                <p>{user.name}</p>
                <p>{user.age}</p>
                <p>{user.email}</p>
                <img alt='avatar' src={`/user/${user._id}/avatar`} />
                <NavLink exact to="/edit">Edit user info</NavLink>
                <CreateTask/>
                <Chat user={user}/>
              </div>
        }
      </>
  );
}

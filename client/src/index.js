import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Route} from "react-router";
import Registration from "./Registration";
import Login from "./Login";
import Restore from "./restore";
import {BrowserRouter} from "react-router-dom";
import editUser from "./editUser";

ReactDOM.render(
    <BrowserRouter>
      <Route exact={true} path='/reg' component={Registration}/>
      <Route exact={true} path='/login' component={Login}/>
      <Route exact={true} path='/restore' component={Restore}/>
      <Route exact={true} path='/edit' component={editUser}/>
      <Route exact={true} path='/' component={App}/>
    </BrowserRouter>
    , document.getElementById('root'));

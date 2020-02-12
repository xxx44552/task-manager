import React from 'react';
import io from 'socket.io-client';
import {NavLink} from "react-router-dom";
let socket = io('http://localhost:5000');

export default class Chat extends React.Component {

  constructor() {
    super();

    this.state = {
      listMess: [],
      mess: '',
      countClient: null,
      connectNewUSerText: null,
      chatColor: localStorage.getItem('messColor') || '#414042'
    }
  }

  sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMess', {mess: this.state.mess, name: this.props.user.name, color: this.state.chatColor});
    e.target.reset()
    localStorage.setItem('messColor', this.state.chatColor)
  };



  componentDidMount() {
    socket.on('clientCount', count => {
      this.setState({
        countClient: count
      })
    });

    socket.on('addMess', (msg) => {
      this.setState({
        listMess: this.state.listMess.concat(msg)
      })
    });

    socket.on('user connected', text => {
      this.setState({
        connectNewUSerText: text
      });
      setTimeout(()=>this.setState({connectNewUSerText: null}), 1500);
    });
  }


  render() {

    const {listMess, connectNewUSerText, countClient, chatColor} = this.state;
    console.log(countClient, '-=-=-')
    return (
        <>
          <div className="card chat" style={{"width": "250px"}}>
            <div className="card-body">
              <h5>Чат</h5>
              <span className={'small'}>Кол. подкл. пользователей {countClient}</span>
              {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
              <div>
                {
                  listMess.map((el, i) => {
                    console.log(el)
                    return <h6  key={i}><b style={{color: el.color}}>{el.name} - </b>{el.mess}</h6>
                  })
                }
              </div>
              <form onSubmit={this.sendMessage}>
                <textarea className={'form-control'} onChange={e=>this.setState({mess: e.target.value})}></textarea>
                <div className="chat-group">
                  <span>Цвет:</span>
                  <input type='color' defaultValue={chatColor} onChange={e=> {
                    this.setState({chatColor: e.target.value})
                  }}/>
                  <button className={'btn btn-outline-success add-text'}>Отправить</button>
                </div>
              </form>
            </div>
          </div>
        </>
    )
  }
}


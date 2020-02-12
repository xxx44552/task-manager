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
      chatColor: localStorage.getItem('messColor') || '#414042',
      showChat: false
    }
  }

  sendMessage = (e) => {
    if(!this.state.mess) return;
    e.preventDefault();
    socket.emit('sendMess', {mess: this.state.mess, name: this.props.user.name, color: this.state.chatColor});
    e.target.reset();
    this.setState({mess: ''});
    localStorage.setItem('messColor', this.state.chatColor)
  };

  getCountChatUser = () => {
    socket.on('clientCount', count => {
      console.log(count, '0-0-')
      this.setState({
        countClient: count
      })
    });
  }

  componentDidMount() {

    this.getCountChatUser();

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

    const {listMess, connectNewUSerText, countClient, chatColor, showChat} = this.state;

    return (
        <>
          <button onClick={() => this.setState({showChat: !showChat})}>Показать чат</button>
          {
            showChat ?
                <div className="chat">
                  <button onClick={() => this.setState({showChat: !showChat})}>Закрыть чат</button>
                  <div className="card-body">
                    <h5>Чат</h5>
                    <span className={'small'}>Кол. подкл. пользователей {countClient}</span>
                    {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
                    <div>
                      {
                        listMess.map((el, i) => {
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
                : null
          }
        </>
    )
  }
}


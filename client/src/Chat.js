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
    e.preventDefault();
    if(!this.state.mess) return;
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
          <div onClick={() => this.setState({showChat: !showChat})}>
            <svg id="Layer_1" className='chat-icon' width='75px' height='75px' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <title>happy-message</title>
              <g id="happy-message">
                <path id="label" d="M256,0C114.61,0,0,114.63,0,256S114.61,512,256,512,512,397.37,512,256,397.37,0,256,0Z" fill="#84d4f0" />
                <g id="happy-message-2" data-name="happy-message">
                  <polygon points="256 328.89 391.68 328.89 391.68 145.06 120.32 145.06 120.32 328.89 194.72 328.89 194.72 381.41 256 328.89" fill="#fff" />
                  <path d="M189.6,392.54V334H115.2V139.94H396.8V334H257.9l-68.3,58.53Zm-64.16-68.77h74.4v46.51l54.26-46.51H386.56V150.18H125.44V323.77Z" fill="#2c4c76" />
                  <path d="M321.51,202.84a5.13,5.13,0,0,1-4.72-3.13,18.36,18.36,0,0,0-17-11.11.47.47,0,0,0-.19,0,18.33,18.33,0,0,0-17,11.1,5.12,5.12,0,1,1-9.44-4,28.47,28.47,0,0,1,26.41-17.37,1.43,1.43,0,0,1,.33,0,28.48,28.48,0,0,1,26.35,17.37,5.11,5.11,0,0,1-2.73,6.7,5.06,5.06,0,0,1-2,.41Z" fill="#2c4c76" />
                  <path d="M190.72,202.67a5.07,5.07,0,0,1-2.43-.61,5.12,5.12,0,0,1-2.07-6.94,28.62,28.62,0,0,1,25.26-14.92h.2a28.59,28.59,0,0,1,25.19,14.89,5.12,5.12,0,1,1-9,4.89,18.37,18.37,0,0,0-16.22-9.54h-.13A18.39,18.39,0,0,0,195.22,200a5.11,5.11,0,0,1-4.51,2.67Z" fill="#2c4c76" />
                  <path d="M256,297.81a71.88,71.88,0,0,1-71.68-66.52H327.68A71.9,71.9,0,0,1,256,297.81Z" fill="#fc6e51" />
                  <path d="M256,302.93h0a77.29,77.29,0,0,1-76.78-71.27,5.13,5.13,0,0,1,5.1-5.49H327.68a5.13,5.13,0,0,1,5.1,5.49A77.3,77.3,0,0,1,256,302.93Zm-65.93-66.52a66.76,66.76,0,0,0,131.87,0Z" fill="#2c4c76" />
                </g>
              </g>
            </svg></div>
          {
            showChat ?
                <div className="chat">
                  <button className={'btn btn-outline-danger close-chat'} onClick={() => this.setState({showChat: !showChat})}>Закрыть чат</button>
                  <div className="card-body">
                    <h5>Чат</h5>
                    <span className={'small'}>Кол. подкл. пользователей {countClient}</span>
                    {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
                    <div className="chat-wrap">
                      <div className={'chat-place'}>
                        {
                          listMess.map((el, i) => {
                            return <h6  key={i}><b style={{color: el.color}}>{el.name} - </b>{el.mess}</h6>
                          })
                        }
                      </div>
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


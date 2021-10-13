/* eslint-disable */
import { Component } from 'react';
import '../css/Chat_Main.css';

class Chat_Main extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
  }
  componentDidMount() {
    this.update();
  }
  send() {
    var input = document.getElementById('input');
    var message = document.getElementById('input').value;
    if (message) {
      var chat = document.getElementById('chat');
      var msg_container = document.createElement('div');

      var node = document.createTextNode(message);
      msg_container.classList.add('me');
      msg_container.appendChild(node);
      msg_container.appendChild(this.getTime('me'));

      chat.appendChild(msg_container);

      console.log(this.props.target_room);
      this.socket.emit('send-message', {
        type: 'send-message',
        message: message,
        room: this.props.target_room
      });
      input.value = null;
    }
  }
  getTime(sender) {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (min < 10) {
      min = '0' + min;
    }
    var time_container = document.createElement('div');
    var time_node = document.createTextNode(`${hour}:${min}`);
    time_container.classList.add(sender + '_time');
    time_container.appendChild(time_node);
    return time_container;
  }
  enter_Check() {
    var input = document.getElementById('input');
    var chat = document.getElementById('chat');
    if (input.value) {
      if (window.event.keyCode == 13) {
        this.send();
        chat.scrollTop = chat.scrollHeight;
      }
    }
  }
  update() {
    this.socket.on('update', function (data) {
      var chat = document.getElementById('chat');
      var message = document.createElement('div');
      var className = '';

      switch (data.type) {
        case 'send-message':
          className = 'other';
          break;
        case 'connect':
          className = 'connect';
          break;
        case 'disconnect':
          className = 'disconnect';
          break;
      }

      var node = document.createTextNode(`${className} : ${data.message}`);
      message.classList.add(className);
      message.appendChild(node);
      if (className == 'other') {
        let today = new Date();
        let hour = today.getHours();
        let min = today.getMinutes();
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (min < 10) {
          min = '0' + min;
        }
        var time_container = document.createElement('div');
        var time_node = document.createTextNode(`${hour}:${min}`);
        time_container.classList.add('other_time');
        time_container.appendChild(time_node);
        message.appendChild(time_container);
        chat.appendChild(message);
      } else {
        chat.appendChild(message);
      }
    });
  }
  render() {
    return (
      <div className="Chat_Container">
        <div id="Chat_Header">
          <button
            id="close_chatRoom_btn"
            onClick={function () {
              this.props.close();
            }.bind(this)}
          >
            {'<'}
          </button>
          <div id="chat">{/* 채팅 들어갈 영역 */}</div>
          <div className="input_Container">
            <input
              type="text"
              id="input"
              placeholder="메시지를 입력해주세요.."
              onKeyUp={function () {
                this.enter_Check();
              }.bind(this)}
            />
            <button
              id="send_btn"
              onClick={function () {
                this.send();
              }.bind(this)}
            >
              전송
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat_Main;
/* eslint-enable */

/* eslint-disable */
import React, { Component } from 'react';
import '../css/Chat_Room.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chat_Main from './Chat_Main';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
class Chat_Room extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
  }

  join(e) {
    var target_ = e.target.parentNode;
    var target_room = e.target.parentNode.getAttribute('id');
    if (target_room == 'profile' || target_room == 'chat_info') {
      target_room = target_.parentNode.parentNode.getAttribute('id');
    }
    <Route
      exact
      path={'/' + target_room}
      component={(props) => (
        <Chat_Main socket={this.socket} target_room={target_room}></Chat_Main>
      )}
    ></Route>;
    this.socket.emit('join_Room', target_room);
    this.props.openRoom(target_room);
  }

  render() {
    return (
      <div className="Chat_Room_Container">
        <div className="Chat_Room">
          {/* 여기 채팅방 리스트 쭉 나열 됨 */}
          <div className="room" id="1">
            <button
              onClick={function (e) {
                this.join(e);
              }.bind(this)}
            >
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용.......</div>
              </div>
            </button>
          </div>
          <div className="room" id="2">
            <button>
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용......</div>
              </div>
            </button>
          </div>
          <div className="room" id="3">
            <button
              onClick={function (e) {
                this.join(e);
              }.bind(this)}
            >
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용.......</div>
              </div>
            </button>
          </div>
          <div className="room" id="4">
            <button
              onClick={function (e) {
                this.join(e);
              }.bind(this)}
            >
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용.......</div>
              </div>
            </button>
          </div>
          <div className="room" id="5">
            <button
              onClick={function (e) {
                this.join(e);
              }.bind(this)}
            >
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용.......</div>
              </div>
            </button>
          </div>
          <div className="room" id="6">
            <button
              onClick={function (e) {
                this.join(e);
              }.bind(this)}
            >
              <div id="profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="userCircle"
                  size="2x"
                  color="gray"
                />
              </div>
              <div id="chat_info">
                <div id="room_name">채팅방 이름</div>
                <div id="room_desc">채팅방 내용.......</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat_Room;
/* eslint-enable */

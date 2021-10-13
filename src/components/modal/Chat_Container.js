/* eslint-disable */
import { Component } from 'react';
import '../css/Chat_Container.css';
import Header from './Header';
import Footer from './Footer';
import Alert_Main from '../alert/Alert_Main';
import Setting_Main from '../setting/Setting_Main';
import Chat_Room from '../chat/Chat_Room';
import Chat_Main from '../chat/Chat_Main';

class Chat_Container extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'alert', target_room: null };
    this.socket = this.props.socket;
  }
  update_chatRoom1() {
    //var chat_Container = this.update.update_chatRoom2;
    //return chat_Container;
    alert('Chat_container');
  }
  getContent() {
    var content = null;
    if (this.state.mode === 'alert') {
      content = <Alert_Main></Alert_Main>;
    } else if (this.state.mode === 'chat') {
      content = (
        <Chat_Room
          socket={this.socket}
          openRoom={function (target_room) {
            this.setState({ mode: 'chat_room', target_room: target_room });
            console.log('Chat_Container', target_room);
          }.bind(this)}
        ></Chat_Room>
      );
    } else if (this.state.mode === 'setting') {
      content = <Setting_Main></Setting_Main>;
    } else if (this.state.mode === 'chat_room') {
      content = (
        <Chat_Main
          socket={this.socket}
          target_room={this.state.target_room}
          close={function () {
            this.setState({ mode: 'chat', target_room: null });
          }.bind(this)}
          ref={(ref) => (this.update = ref)}
        ></Chat_Main>
      );
    }
    return content;
  }
  render() {
    return (
      <div className="Chat_Container_Container">
        <Header
          close={function () {
            this.props.close();
          }.bind(this)}
          mode={this.state.mode}
        ></Header>
        <div className="content">{this.getContent()}</div>
        <Footer
          changeMode={function (mode) {
            this.setState({
              mode: mode
            });
          }.bind(this)}
        ></Footer>
      </div>
    );
  }
}

export default Chat_Container;
/* eslint-enable */

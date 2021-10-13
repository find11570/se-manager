/* eslint-disable */
import { Component } from 'react';
import Chat_Container from './Chat_Container';
import '../css/Modal2.css';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Modal2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'close'
    };
    this.socket = this.props.socket;
  }
  ChangeMode() {
    var modal = null;
    if (this.state.mode === 'open') {
      modal = (
        <Chat_Container
          close={function () {
            this.setState({ mode: 'close' });
          }.bind(this)}
          socket={this.socket}
          ref={(ref) => (this.update = ref)}
        ></Chat_Container>
      );
    } else if (this.state.mode === 'close') {
      modal = null;
    }
    return modal;
  }
  update_chatRoom() {
    this.update.update_chatRoom1();
  }
  render() {
    return (
      <div className="Modal2_Container">
        <button
          id="Modal2_btn"
          onClick={function (e) {
            e.preventDefault();
            var cur_mode = this.state.mode;
            if (cur_mode === 'close') {
              this.setState({ mode: 'open' });
            } else {
              this.setState({ mode: 'close' });
            }
          }.bind(this)}
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            className="CommentDots"
            size="2x"
            color="white"
          />
        </button>
        {this.ChangeMode()}
      </div>
    );
  }
}
export default Modal2;
/* eslint-enable */

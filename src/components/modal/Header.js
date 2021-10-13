/* eslint-disable */
import { Component } from 'react';
import '../css/Header.css';

class Header extends Component {
  getHeaderName() {
    var header = null;
    if (this.props.mode === 'alert') {
      header = '알림';
    } else if (this.props.mode === 'chat') {
      header = '채팅';
    } else if (this.props.mode === 'setting') {
      header = '설정';
    }
    return header;
  }
  render() {
    return (
      <div className="Header_Container">
        <div className="Header_Content_Name">{this.getHeaderName()}</div>
        {/* <div className="close_btn_Container">
          <button
            id="close_btn"
            onClick={function (e) {
              e.preventDefault();
              this.props.close();
            }.bind(this)}
          >
            X
          </button>
        </div> */}
      </div>
    );
  }
}
export default Header;
/* eslint-enable */

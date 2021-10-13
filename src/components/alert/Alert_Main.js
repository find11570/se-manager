/* eslint-disable */
import { Component } from 'react';
import '../css/Alert_Main.css';

class Alert_Main extends Component {
  render() {
    return (
      <div className="Alert_Container">
        <div className="Alert_list">
          {/* 여기 알림 리스트 쭉 나열 됨 */}
          <div className="alert_content" id="1">
            <button>
              <div id="alert_title">채팅방 이름</div>
              <div id="alert_info">
                <div id="alert_desc">채팅방 내용......</div>
                <div id="alert_time">10:10</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Alert_Main;
/* eslint-enable */

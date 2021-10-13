/* eslint-disable */
import { Component } from 'react';
import '../css/Setting_Main.css';

class Setting_Main extends Component {
  render() {
    return (
      <div className="Setting_Container">
        <div id="alert_check">
          <p>알림 설정</p>
          <label className="switch-button">
            {' '}
            <input type="checkbox" /> <span className="onoff-switch"></span>{' '}
          </label>
        </div>
      </div>
    );
  }
}
export default Setting_Main;
/* eslint-enable */

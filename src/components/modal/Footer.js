/* eslint-disable */
import { Component } from 'react';
import { faBell, faCogs, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer_Container">
        <a
          className="Footer_href"
          onClick={function (e) {
            e.preventDefault();
            this.props.changeMode('alert');
          }.bind(this)}
        >
          <FontAwesomeIcon icon={faBell} className="Bell" size="1x" />
        </a>
        <a
          className="Footer_href"
          onClick={function (e) {
            e.preventDefault();
            this.props.changeMode('chat');
          }.bind(this)}
        >
          <FontAwesomeIcon icon={faComment} className="Comment" size="1x" />
        </a>
        <a
          className="Footer_href"
          onClick={function (e) {
            e.preventDefault();
            this.props.changeMode('setting');
          }.bind(this)}
        >
          <FontAwesomeIcon icon={faCogs} className="Cogs" size="1x" />
        </a>
      </div>
    );
  }
}
export default Footer;
/* eslint-enable */

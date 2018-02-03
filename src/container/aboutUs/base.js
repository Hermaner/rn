import React from 'react';

class AboutUsBase extends React.Component {
  wxLogin = () => {
    WeChat.sendAuthRequest('snsapi_userinfo', 'App')
    .then(res => console.log(res));
  }
  common() {
    this.name = 'herman';
  }
}
export default AboutUsBase;

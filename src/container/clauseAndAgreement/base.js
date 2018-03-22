import React from 'react';
import { GetServicesTermService } from '../../api';

class ClauseAndAgreementBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
    };
  }
  getData = () => {
    this.sleek.toggle();
    GetServicesTermService({
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          info: result,
        });
      } else {
        console.log(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default ClauseAndAgreementBase;

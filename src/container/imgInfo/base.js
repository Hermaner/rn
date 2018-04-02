import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetPowerBusinessImgService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
    };
  }
  getInit = () => {
    const { imgDetail } = this.props.navigation.state.params;
    if (imgDetail !== null && imgDetail !== '') {
      this.setState({
        imgList: imgDetail.split(','),
      });
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;

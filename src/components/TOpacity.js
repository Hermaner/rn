import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class TLight extends React.Component {
  static propTypes = {
    content: PropTypes.element,
    TPress: PropTypes.func,
    style: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDisable: false,
    };
    this.lightPress = this.lightPress.bind(this);
  }
  async lightPress() {
    const { TPress } = this.props;
    if (!TPress) {
      return;
    }
    TPress();
    await this.setState({ isDisable: true });
    this.timer = setTimeout(async () => {
      await this.setState({ isDisable: false });
    }, 500);
  }
  render() {
    const { style, content } = this.props;
    const { isDisable } = this.state;
    return (
      <TouchableOpacity
        disabled={isDisable}
        onPress={this.lightPress}
        style={style}
      >
        {content}
      </TouchableOpacity>
    );
  }

}

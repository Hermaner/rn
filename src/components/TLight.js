import React from 'react';
import { TouchableHighlight } from 'react-native';
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
  componentWillUnmount() {
    this.timer = null;
    this.setState = () => ({});
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
      <TouchableHighlight
        disabled={isDisable}
        onPress={this.lightPress}
        {...this.props}
        style={style}
      >
        {content}
      </TouchableHighlight>
    );
  }

}

import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

export default class TLight extends React.Component {
  static propTypes = {
    content: PropTypes.element,
    onPress: PropTypes.func,
    style: PropTypes.any,
    underlayColor: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDisable: false,
    };
    this.lightPress = this.lightPress.bind(this);
  }
  async lightPress() {
    const { onPress } = this.props;
    if (!onPress) {
      return;
    }
    onPress();
    await this.setState({ isDisable: true });
    this.timer = setTimeout(async () => {
      await this.setState({ isDisable: false });
    }, 500);
  }
  render() {
    const { style, content, underlayColor } = this.props;
    const { isDisable } = this.state;
    return (
      <TouchableHighlight
        disabled={isDisable}
        {...this.props}
        // underlayColor={underlayColor || '#e2e2e2'}
        onPress={this.lightPress}
        style={style}
      >
        {content}
      </TouchableHighlight>
    );
  }

}

import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
  static propTypes = {
    content: PropTypes.element,
    onPress: PropTypes.func,
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
    const { content } = this.props;
    const { isDisable } = this.state;
    return (
      <TouchableWithoutFeedback
        disabled={isDisable}
        onPress={this.lightPress}
      >
        {content}
      </TouchableWithoutFeedback>
    );
  }

}

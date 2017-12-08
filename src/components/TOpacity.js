import React from 'react';
import { TouchableOpacity } from 'react-native';

export default class TLight extends React.Component {
  static propTypes = {
    content: React.PropTypes.element,
    TPress: React.PropTypes.func,
    LPress: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDisable: false,
    };
    this.lightPress = this.lightPress.bind(this);
  }
  async lightPress() {
    this.props.TPress();
    await this.setState({ isDisable: true });
    this.timer = setTimeout(async () => {
      await this.setState({ isDisable: false });
    }, 500);
  }
  render() {
    const { style, content, disabled, LPress } = this.props;
    const { isDisable } = this.state;
    return (
      <TouchableOpacity
        disabled={disabled || isDisable}
        onPress={this.lightPress}
        onLongPress={LPress}
        style={style}
      >
        {content}
      </TouchableOpacity>
    );
  }

}

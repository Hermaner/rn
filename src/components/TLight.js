import React from 'react';
import { TouchableHighlight } from 'react-native';

export default class TLight extends React.Component {
  static propTypes = {
    content: React.PropTypes.element,
    TPress: React.PropTypes.func,
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

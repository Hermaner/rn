import React from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { Mred } from '../utils';

const styles = StyleSheet.create({
  container: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Mred,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    height: 35,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#222',
  },
  stepWrap: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Mred,
  },
  stepText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  stepDisabled: {
    backgroundColor: 'rgba(239, 239, 239, 0.72)',
  },
  disabledStepTextColor: {
    color: '#ccc',
  },
  highlightStepTextColor: {
    color: '#fff',
  },
  highlightStepBorderColor: {
    backgroundColor: '#DD3D34',
  },
});
export default class InputNumber extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    upStyle: PropTypes.object,
    downStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    onChange: PropTypes.func,
    max: PropTypes.any,
    min: PropTypes.any,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    readOnly: PropTypes.bool,
  };
  static defaultProps = {
    max: Infinity,
    min: -Infinity,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.onChange = this.onChange.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onPressInDown = this.onPressInDown.bind(this);
    this.onPressOutDown = this.onPressOutDown.bind(this);
    this.onPressInUp = this.onPressInUp.bind(this);
    this.onPressOutUp = this.onPressOutUp.bind(this);
    this.down = this.down.bind(this);
    this.up = this.up.bind(this);
    this.step = this.step.bind(this);
  }
  onPressIn(type) {
    if (this.props.disabled) {
      return;
    }
    this[type].setNativeProps({
      style: [styles.stepWrap, styles.highlightStepBorderColor],
    });
    this[`${type}Text`].setNativeProps({
      style: [styles.stepText, styles.highlightStepTextColor],
    });
  }
  onPressOut(type) {
    if (this.props.disabled) {
      return;
    }
    this[type].setNativeProps({
      style: [styles.stepWrap],
    });
    this[`${type}Text`].setNativeProps({
      style: [styles.stepText],
    });
  }
  onPressInDown(e) {
    this.onPressIn('_stepDown');
    this.down(e, true);
  }
  onPressOutDown() {
    this.onPressOut('_stepDown');
  }
  onPressInUp(e) {
    this.onPressIn('_stepUp');
    this.up(e, true);
  }
  onPressOutUp() {
    this.onPressOut('_stepUp');
  }
  onChange(val) {
    const { min, max } = this.props;
    let value = val;
    if (val > max) {
      value = max;
    } else if (val < min) {
      value = min;
    }
    if (!isNaN(value)) {
      value = parseInt(value, 10) || 0;
      this.setState({
        value,
      });
      this.props.onChange(value);
    } else {
      this.setState({
        value: this.state.value,
      });
    }
  }
  down(e) {
    if (e.persist) {
      e.persist();
    }
    this.step('down', e);
  }
  up(e) {
    if (e.persist) {
      e.persist();
    }
    this.step('up', e);
  }
  step(type, e) {
    if (e) {
      e.preventDefault();
    }
    const props = this.props;
    if (props.disabled) {
      return;
    }
    let val = props.value;
    if (val > props.max) {
      val = props.max;
    } else if (val < props.min) {
      val = props.min;
    } else if (type === 'down') {
      val -= 1;
    } else {
      val += 1;
    }
    this.setState({
      value: val,
    });
    this.props.onChange(val);
  }
  render() {
    const { props } = this;
    const { value } = this.state;
    const { style, upStyle, downStyle, inputStyle, max, min } = this.props;
    const editable = !this.props.readOnly && !this.props.disabled;

    let upDisabledStyle = null;
    let downDisabledStyle = null;
    let upDisabledTextStyle = null;
    let downDisabledTextStyle = null;
    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= max) {
        upDisabledStyle = styles.stepDisabled;
        upDisabledTextStyle = styles.disabledStepTextColor;
      }
      if (val <= min) {
        downDisabledStyle = styles.stepDisabled;
        downDisabledTextStyle = styles.disabledStepTextColor;
      }
    } else {
      upDisabledStyle = styles.stepDisabled;
      downDisabledStyle = styles.stepDisabled;
      upDisabledTextStyle = styles.disabledStepTextColor;
      downDisabledTextStyle = styles.disabledStepTextColor;
    }

    let inputDisabledStyle = null;
    if (props.disabled) {
      upDisabledStyle = styles.stepDisabled;
      downDisabledStyle = styles.stepDisabled;
      upDisabledTextStyle = styles.disabledStepTextColor;
      downDisabledTextStyle = styles.disabledStepTextColor;
      inputDisabledStyle = styles.disabledStepTextColor;
    }
    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback
          onPressIn={(editable && !downDisabledStyle) ? this.onPressInDown : undefined}
          onPressOut={(editable && !downDisabledStyle) ? this.onPressOutDown : undefined}
        >
          <View
            ref={(component) => { this._stepDown = component; }}
            style={[styles.stepWrap, downDisabledStyle, downStyle]}
          >
            <Icon ref={(component) => { this._stepDownText = component; }} name="md-remove" style={[styles.stepText, downDisabledTextStyle]} />
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          style={[styles.input, inputDisabledStyle, inputStyle]}
          ref={(component) => { this.input = component; }}
          value={this.props.value.toString() || value.toString()}
          editable={editable}
          onChangeText={this.onChange}
          underlineColorAndroid="transparent"
          keyboardType={'numeric'}
        />
        <TouchableWithoutFeedback
          onPressIn={(editable && !upDisabledStyle) ? this.onPressInUp : undefined}
          onPressOut={(editable && !upDisabledStyle) ? this.onPressOutUp : undefined}
        >
          <View
            ref={(component) => { this._stepUp = component; }}
            style={[styles.stepWrap, upDisabledStyle, upStyle]}
          >
            <Icon ref={(component) => { this._stepUpText = component; }} name="md-add" style={[styles.stepText, upDisabledTextStyle]} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

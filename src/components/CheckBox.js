import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { st } from '../utils';
import TFeedback from './TFeedback';

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    ...st.frcenter,
  },
  left: {
    marginLeft: 5,
    marginRight: 5,
  },
  rightIco: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 26,
  },
});

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  change = () => {
    const { isRadio, value, modal, onPress } = this.props;
    if (isRadio) {
      if (modal[0] === value) {
        return;
      }
      const data = [value];
      onPress(data);
    } else {
      let spIndex = null;
      modal.forEach((item, index) => {
        if (item === value) {
          spIndex = index;
        }
      });
      if (spIndex === null) {
        modal.push(value);
      } else {
        modal.splice(spIndex, 1);
      }
      onPress(modal);
    }
  }
  render() {
    const { content, reverse, value, color, modal, style, isAn } = this.props;
    const isChecked = modal.length > 0 && (value.toString()).indexOf(modal) > -1;
    return (
      <TFeedback
        content={
          <View style={[styles.list, style, reverse && { flexDirection: 'row-reverse' }]}>
            <View style={[styles.left, !isAn && { flex: 1 }]}>
              {content}
            </View>
            <Icon
              name={isChecked ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'}
              style={[styles.rightIco, { color }]}
            />
          </View>
        }
        onPress={this.change}
      />
    );
  }
}
CheckBox.propTypes = {
  content: PropTypes.element,
  style: PropTypes.any,
  modal: PropTypes.array,
  onPress: PropTypes.func,
  reverse: PropTypes.bool,
  isAn: PropTypes.bool,
  isRadio: PropTypes.bool,
  value: PropTypes.any,
  color: PropTypes.string,
};
export default CheckBox;

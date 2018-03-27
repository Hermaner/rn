

import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Avatar from './Avatar';
import Bubble from './Bubble';
import Day from './Day';

import { isSameUser, isSameDay } from './utils';

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
      marginBottom: 10,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginBottom: 10,
      marginRight: 8,
    },
  }),
};
export default class Message extends React.Component {

  getInnerComponentProps() {
    const { ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    return <Bubble {...bubbleProps} />;
  }
  renderAvatar() {
    const avatarProps = this.getInnerComponentProps();
    return <Avatar {...avatarProps} />;
  }

  render() {
    const { position } = this.props;
    return (
      <View>
        {this.renderDay()}
        <View
          style={[
            styles[position].container,
          ]}
        >
          {position === 'left' ? this.renderAvatar() : null}
          {this.renderBubble()}
          {position === 'right' ? this.renderAvatar() : null}
        </View>
      </View>
    );
  }

}

Message.defaultProps = {
  position: 'left',
  currentMessage: {},
  previousMessage: {},
};

Message.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
};

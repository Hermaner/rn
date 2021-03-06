/* eslint
    no-console: 0,
    no-param-reassign: 0,
    no-use-before-define: ["error", { "variables": false }],
    no-return-assign: 0,
    react/no-string-refs: 0
*/

import PropTypes from 'prop-types';
import React from 'react';

import { ListView, View, StyleSheet } from 'react-native';

import shallowequal from 'shallowequal';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import md5 from 'md5';
import LoadEarlier from './LoadEarlier';
import Message from './Message';

export default class MessageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.hash !== r2.hash,
    });
    // const messagesData = this.prepareMessages(props.messages);
    this.state = {
      dataSource: dataSource.cloneWithRows(props.messages),
    };
  }

  componentWillReceiveProps() {
    // console.log(nextProps.messages);
    // if (this.props.messages === nextProps.messages) {
    //   return;
    // }
    // const messagesData = this.prepareMessages(nextProps.messages);
    // console.log(messagesData);
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(messagesData.blob, messagesData.keys),
    // });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowequal(this.props, nextProps)) {
      return true;
    }
    if (!shallowequal(this.state, nextState)) {
      return true;
    }
    return false;
  }

  prepareMessages(messages) {
    return {
      keys: messages.map(m => m._id),
      blob: messages.reduce((o, m, i) => {
        const previousMessage = messages[i + 1] || {};
        const nextMessage = messages[i - 1] || {};
        const toHash = JSON.stringify(m) + previousMessage._id + nextMessage._id;
        o[m._id] = {
          ...m,
          index: i,
          previousMessage,
          nextMessage,
          hash: md5(toHash),
        };
        return o;
      }, {}),
    };
  }

  scrollTo(options) {
    this._invertibleScrollViewRef.scrollTo(options);
  }

  renderLoadEarlier() {
    if (this.props.loadEarlier === true) {
      const loadEarlierProps = {
        ...this.props,
      };
      if (this.props.renderLoadEarlier) {
        return this.props.renderLoadEarlier(loadEarlierProps);
      }
      return <LoadEarlier {...loadEarlierProps} />;
    }
    return null;
  }

  renderFooter() {
    if (this.props.renderFooter) {
      const footerProps = {
        ...this.props,
      };
      return this.props.renderFooter(footerProps);
    }
    return null;
  }

  renderRow(message) {
    const messageProps = {
      ...this.props,
      key: message._id,
      currentMessage: message,
      previousMessage: message.previousMessage,
      nextMessage: message.nextMessage,
      position: message.user._id === this.props.user._id ? 'right' : 'left',
    };
    return <Message {...messageProps} />;
  }

  renderScrollComponent(props) {
    const { invertibleScrollViewProps } = this.props;
    return (
      <InvertibleScrollView
        {...props}
        {...invertibleScrollViewProps}
        ref={component => (this._invertibleScrollViewRef = component)}
      />
    );
  }

  render() {
    const messagesData = this.prepareMessages(this.props.messages);
    const dataSource = this.state.dataSource.cloneWithRows(messagesData.blob, messagesData.keys);
    const contentContainerStyle = this.props.inverted
      ? {}
      : styles.notInvertedContentContainerStyle;
    return (
      <View ref="container" style={styles.container}>
        <ListView
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          initialListSize={20}
          pageSize={20}
          {...this.props.listViewProps}
          dataSource={dataSource}
          contentContainerStyle={contentContainerStyle}
          renderRow={this.renderRow}
          renderHeader={this.props.inverted ? this.renderFooter : this.renderLoadEarlier}
          renderFooter={this.props.inverted ? this.renderLoadEarlier : this.renderFooter}
          renderScrollComponent={this.renderScrollComponent}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notInvertedContentContainerStyle: {
    justifyContent: 'flex-end',
  },
});

MessageContainer.defaultProps = {
  messages: [],
  user: {},
  renderFooter: null,
  renderMessage: null,
  onLoadEarlier: () => { },
  inverted: true,
  loadEarlier: false,
  listViewProps: {},
  invertibleScrollViewProps: {},
};

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  renderFooter: PropTypes.func,
  renderLoadEarlier: PropTypes.func,
  listViewProps: PropTypes.object,
  inverted: PropTypes.bool,
  loadEarlier: PropTypes.bool,
  invertibleScrollViewProps: PropTypes.object,
};

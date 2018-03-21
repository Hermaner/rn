import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class ChatPhrase extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteInit();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <Swipeout
        key={index}
        right={[{
          text: '编辑',
          backgroundColor: 'green',
          color: '#fff',
          underlayColor: '#ff0000',
          onPress: () => this.edit(index),
        }, {
          text: '删除',
          backgroundColor: '#ff0000',
          color: '#fff',
          underlayColor: '#ff0000',
          onPress: () => this.del(index),
        }]}
      >
        <TOpacity
          style={styles.list}
          content={
            <Text style={styles.title}>
              {item.title}
            </Text>
          }
          onPress={() => this.select(item.title)}
        />
      </Swipeout>
    );
  }
  _renderContent() {
    const { items, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          <FlatList
            data={items}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index}
            onRefresh={this.getPhraseService}
            refreshing={refresh}
          />
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="便捷短语"
          rightPress={this.add}
          rightText="添加"
        />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ChatPhrase.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatPhrase);

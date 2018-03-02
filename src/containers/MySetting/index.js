import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, BHeader, TLight } from '../../components';
import base from './base';
import styles from './styles';

class MySetting extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  componentWillUnmount() {
  }
  _renderList() {
    const { push } = this.props;
    const { items } = this.state;
    return (
      <View>
        {
          items.map((item, index) => (
            <TLight
              key={index}
              content={
                <View style={styles.list}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.right}>
                    <Icon name="md-arrow-dropright" style={styles.arr} />
                  </View>
                </View>
              }
              onPress={() => push({ key: item.page })}
            />
          ))
        }
        <TLight
          style={styles.listLast}
          content={
            <View style={styles.list}>
              <Text style={styles.name}>关于我们</Text>
              <View style={styles.right}>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'About' })}
        />
        <TLight
          content={
            <View style={styles.list}>
              <Text style={styles.name}>退出登陆</Text>
              <View style={styles.right}>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            </View>
          }
          onPress={this.logOut}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader
          back={pop}
          title="我的账户"
        />
        <Content>
          {this._renderList()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MySetting.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySetting);

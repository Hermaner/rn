import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TLight, BHeader } from '../../components';
import base from './base';
import styles from './styles';

class MyDrawList extends base {
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
  _renderlist() {
    const { items } = this.state;
    return (
      <View style={styles.content}>
        {
          items.map((item, index) => (
            <TLight
              key={index}
              style={{ marginTop: 6 }}
              content={
                <View style={styles.list}>
                  <View style={styles.left}>
                    <Image style={styles.img} source={item.img} />
                    <Text style={styles.label}>{item.name}</Text>
                  </View>
                  <Text style={styles.label}>{item.info.label}</Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => this.goPage(index)}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader
          back={pop}
          title="提现账号"
        />
        {this._renderlist()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyDrawList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyDrawList);

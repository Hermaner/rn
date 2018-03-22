import React from 'react';
import { BackHandler, View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, TOpacity, NoData } from '../../components';
import base from './base';
import styles from './styles';

class SampleMainList extends base {
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
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _readerContent() {
    const { brands } = this.state;
    return (
      <View style={styles.content}>
        {
          brands.map((item, index) => (
            <View key={index} style={styles.list}>
              <TOpacity
                style={styles.contentTabView}
                content={
                  <Text
                    style={styles.mainText}
                  >
                    {item.brandName}
                  </Text>
                }
                onPress={() => this.brandTab(index)}
              />
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择分类" />
        <Content>
          {this._readerContent()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SampleMainList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SampleMainList);

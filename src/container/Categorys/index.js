import React from 'react';
import { BackHandler, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, TOpacity, NoData } from '../../components';
import base from './base';
import styles from './styles';

class Categorys extends base {
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
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderCategoryLeft() {
    const { goods } = this.state;
    return (
      <View style={styles.leftNav}>
        <Content>
          {
            goods.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => { this.leftTab(index); }}
              >
                <View style={[styles.leftNavList, item.cur && styles.leftNavListCur]}>
                  <Text
                    style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Content>
      </View>
    );
  }
  _renderCategoryContent() {
    const { childgoods } = this.state;
    return (
      <View style={styles.rightContent}>
        {
          childgoods && childgoods.length > 0 ?
            <Content>
              <View style={styles.rightContentView}>
                {
                  childgoods.map((item, index) => (
                    <TOpacity
                      style={styles.contetnTabView}
                      key={index}
                      content={
                        <Text
                          style={styles.mainText}
                        >
                          {item.name}
                        </Text>
                      }
                      onPress={() => this.rightTab(index)}
                    />
                  ))
                }
              </View>
            </Content>
            :
            <NoData
              label="没有相关数据"
            />
        }
      </View>
    );
  }
  _readerContent() {
    return (
      <View style={styles.content}>
        {this._renderCategoryLeft()}
        {this._renderCategoryContent()}
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择分类" />
        {this._readerContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

Categorys.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Categorys);

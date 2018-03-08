import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class MasterCategory extends base {
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
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.content}>
        {
          items.map((item, index) => (
            <View key={index} style={styles.list}>
              <View style={styles.title}>
                <View style={styles.titleColor}>
                  <Icon name="md-apps" style={styles.titleIcon} />
                </View>
                <Text style={styles.listLabel}>{item.name}</Text>
              </View>
              <View style={styles.tabs}>
                {
                  item.childs.map((list, i) => (
                    <TOpacity
                      key={i}
                      style={[styles.tab, list.cur && styles.tabCur]}
                      content={
                        <Text style={[styles.tabText, list.cur && styles.tabTextCur]}>
                          {list.name}
                        </Text>
                      }
                      onPress={() => this.changeTab(index, i)}
                    />
                  ))
                }
              </View>
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
        <Header
          back={pop}
          title="我的工种"
        />
        <Content>
          {this._renderContent()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即保存'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MasterCategory.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MasterCategory);

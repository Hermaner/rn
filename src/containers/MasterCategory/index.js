import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon } from 'native-base';
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
        <TOpacity
          style={styles.tabAll}
          content={
            <Text style={styles.tabText}>查看所有</Text>
          }
          onPress={() => this.props.push({ key: 'MasterList', params: { typeIds: '', typeIndex: 'none', type: 'none' } })}
        />
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
                      style={styles.tab}
                      content={
                        <Text style={styles.tabText}>{list.name}</Text>
                      }
                      onPress={() => this.props.push({ key: 'MasterList', params: { typeIds: list.id, typeIndex: index, typeI: i } })}
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
          title="选择师傅类别"
        />
        <Content>
          {this._renderContent()}
        </Content>
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

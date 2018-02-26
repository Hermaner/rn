import React from 'react';
import { View, ScrollView, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TOpacity, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class DemandCategory extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderLeft() {
    const { items } = this.state;
    return (
      <View style={styles.left}>
        <ScrollView style={styles.leftScroll}>
          {
            items.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.leftList, item.cur && styles.leftListCur]}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                }
                onPress={() => { this.changeTab(index); }}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
  _renderRow = (info) => {
    const item = info.item;
    return (
      <View style={styles.rightTabs}>
        {
          item.map((list, i) => (
            <TOpacity
              key={i}
              style={styles.rightTab}
              content={
                <Text style={styles.text}>{list.name}</Text>
              }
              onPress={() => { this.props.push({ key: 'DemandConfirm', params: { item: list } }); }}
            />
          ))
        }
      </View>
    );
  }
  _renderSectionHeader(info) {
    return (
      <View style={styles.rightTitle}>
        <Text style={styles.rightTitleText}>{info.section.key}</Text>
      </View>
    );
  }
  _separatorCom() {
    return (
      <View style={{ height: 4 }} />
    );
  }
  _renderRight() {
    const sections = [];
    const { items } = this.state;
    items.forEach((item) => {
      sections.push({
        key: item.name,
        data: [item.categorys],
      });
    });
    return (
      <View style={styles.right}>
        <SectionList
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderRow}
          sections={sections}
          ref={(o) => { this.tableList = o; }}
          ItemSeparatorComponent={this._separatorCom}
          SectionSeparatorComponent={this._separatorCom}
          keyExtractor={(item, index) => (`${index}`)}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择发布类别" />
        <View style={styles.content}>
          {this._renderLeft()}
          {this._renderRight()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DemandCategory.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandCategory);

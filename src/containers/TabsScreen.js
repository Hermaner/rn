import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import TabHome from './TabHome';
import TabOrder from './TabOrder';
import TabChat from './TabChat';
import TabMine from './TabMine';
import { Mcolor } from '../utils';
import { Iconfont } from '../components';

const styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViewIcon: {
    fontSize: 20,
  },
  tabViewText: {
    fontSize: 12,
  },
});
const TabsScreen = (navigationOptions = {}) => TabNavigator(
  {
    TabHome: {
      screen: TabHome,
    },
    TabOrder: {
      screen: TabOrder,
    },
    TabChat: {
      screen: TabChat,
    },
    TabMine: {
      screen: TabMine,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      ...navigationOptions,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let name;
        switch (routeName) {
          case 'TabHome':
            iconName = 'icon-caigou-xianxing';
            name = '我要买';
            break;
          case 'TabOrder':
            iconName = 'icon-caigou-xianxing';
            name = '我要卖';
            break;
          case 'TabChat':
            iconName = 'icon-kefu';
            name = '聊生意';
            break;
          case 'TabMine':
            iconName = 'icon-wode';
            name = '我的';
            break;
          default:
            break;
        }
        return (
          <View style={styles.tabView}>
            <Iconfont style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
            <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
          </View>
        );
      },
      tabBarOnPress: ({ scene: { index, focused }, jumpToIndex }) => {
        if (focused) {
          return;
        }
        if (index === 2) {
          if (!global.memberId) {
            this.props.push({ key: 'User' });
          }
        }
        if (index === 3) {
          DeviceEventEmitter.emit('emitUser');
        }
        jumpToIndex(index);
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#F5F1FF',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);
TabsScreen.propTypes = {
  push: PropTypes.func,
};
export default TabsScreen();

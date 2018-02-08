import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import home from './home';
import goods from './goods';
import ChatIndex from './ChatIndex';
import mine from './my';
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
    Home: {
      screen: home,
    },
    Goods: {
      screen: goods,
    },
    ChatIndex: {
      screen: ChatIndex,
    },
    Mine: {
      screen: mine,
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
          case 'Home':
            iconName = 'icon-caigou-xianxing';
            name = '我要买';
            break;
          case 'Goods':
            iconName = 'icon-caigou-xianxing';
            name = '我要卖';
            break;
          case 'ChatIndex':
            iconName = 'icon-kefu';
            name = '聊生意';
            break;
          case 'Mine':
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

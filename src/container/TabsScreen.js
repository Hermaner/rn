import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'native-base';
import home from '../container/home';
import goods from '../container/goods';
import carts from '../container/carts';
import mine from '../container/mine';
import { Mcolor } from '../utils';

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
    Carts: {
      screen: carts,
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
            iconName = 'home';
            name = '我要买';
            break;
          case 'Goods':
            iconName = 'pint';
            name = '我要卖';
            break;
          case 'Carts':
            iconName = 'eye';
            name = '聊生意';
            break;
          case 'Mine':
            iconName = 'eye';
            name = '我的';
            break;
          default:
            break;
        }
        return (
          <View style={styles.tabView}>
            <Icon style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
            <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
          </View>
        );
      },
      tabBarOnPress: ({ scene: { index, focused }, jumpToIndex }) => {
        if (focused) {
          return;
        }
        if (index === 2) {
          console.log('判断是否登陆');
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
    swipeEnabled: true,
  },
);
TabsScreen.propTypes = {
  push: PropTypes.func,
};
export default TabsScreen();

import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// add import for createStackNavigator
import { createStackNavigator } from 'react-navigation-stack';

// import screen components
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';

// navigation stack
const FeedStack = createStackNavigator({
  Feed: Feed,
  Note: NoteScreen
});

const MyStack = createStackNavigator({
  MyNotes: MyNotes,
  Note: NoteScreen
});

const FavStack = createStackNavigator({
  Favorites: Favorites,
  Note: NoteScreen
});

// navigation tabs
const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: 'Feed',
      }
    },
    MyNoteScreen: {
      screen: MyStack,
      navigationOptoins: {
        tabBarLabel: 'My Notes',
      }
    },
    FavoriteScreen: {
      screen: FavStack,
      navigationOptions: {
        tabBarLabel: 'Favorites',
      }
    }
  });  

// create the app container
export default createAppContainer(TabNavigator);

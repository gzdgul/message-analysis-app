import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./pages/home";
import Analysis from "./pages/analysis";
const MainStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="Analysis" component={Analysis} />
        </MainStack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./pages/home";
import Analysis from "./pages/analysis";
import SplashScreen from "./pages/SplashScreen";
import welcomeFirstScreen from "./pages/welcome/welcomeFirstScreen";
import welcomeSetDateFormat from "./pages/welcome/welcomeSetDateFormat";
import welcomeSetLanguage from "./pages/welcome/welcomeSetLanguage";
import welcomeContentScreen from "./pages/welcome/WelcomeContentScreen";
const MainStack = createNativeStackNavigator();
const WelcomeStack = createNativeStackNavigator();


const WelcomeScreen = () => {
    return (
        <WelcomeStack.Navigator  screenOptions={{headerShown: false}}>
            <WelcomeStack.Screen name="welcomeFirst" component={welcomeFirstScreen}/>
            <WelcomeStack.Screen name="welcomeLanguage" component={welcomeSetLanguage}/>
            <WelcomeStack.Screen name="welcomeFormat" component={welcomeSetDateFormat}/>
            <WelcomeStack.Screen name="welcomeContent" component={welcomeContentScreen}/>
        </WelcomeStack.Navigator>
    )
}

export default function App() {

  return (
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Splash" component={SplashScreen}/>
          <MainStack.Screen name="Home" component={Home} options={{animation: "fade",}}  />
            <MainStack.Screen name="welcome" component={WelcomeScreen} />
          <MainStack.Screen name="Analysis" component={Analysis} />
        </MainStack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

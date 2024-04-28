import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/homeScreen";
import CoinDetailedScreen from "../screens/coinDetailedScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={ { headerShown: false } }
        >
            <Stack.Screen name="Home" component={ HomeScreen } />
            <Stack.Screen name="CoinDetailedScreen" component={ CoinDetailedScreen } />
        </Stack.Navigator>
    );
}

export default Navigation
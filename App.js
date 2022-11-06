import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './app/navigation/Tabs';
import { OrderDelivery, Restaurants } from './app/screens';
import { createContext, useContext } from 'react';

export const ShoopingCart = createContext([]);
export default function App() {
  const Stack = createNativeStackNavigator();

  const [shopingCart, setSopingCart] = useContext(ShoopingCart);
  return (
    <ShoopingCart.Provider values={[shopingCart, setSopingCart]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tab" component={Tabs} />
          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShoopingCart.Provider>
  );
}

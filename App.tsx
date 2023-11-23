import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
  return (
    <View>

    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App
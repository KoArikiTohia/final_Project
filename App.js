import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import NotesScreen from './screens/Notes';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'
                screenOptions={{
                    headerStyle: { backgroundColor: '#55BCF6' },
                    headerTintColor: 'white',
                    headerShown: true,
                    headerBackVisible: true,
                    headerTitleAlign: 'center',
                }} >

                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                />

                <Stack.Screen
                    name='Notes'
                    component={NotesScreen}
                />

            </Stack.Navigator >
        </NavigationContainer>
    );
};

export default App;
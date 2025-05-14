import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './componenets/ui/IconButton';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='AllPlaces' component={AllPlaces} options={({navigation}) => ({
                        headerRight: ({tintColor}) => (
                            <IconButton 
                                icon={'add'} 
                                color={tintColor} 
                                size={24} 
                                onPress={
                                    () => navigation.navigate('AddPlace')
                                }
                            />
                        ),
                        presentation: 'modal'
                    })}/>
                    <Stack.Screen name='AddPlace' component={AddPlace} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

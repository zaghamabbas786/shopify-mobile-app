import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/MainNavigator';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  processColor
} from 'react-native';

import {
  ApplicationProvider,
  IconRegistry,
  Icon,
  Button
} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  dark as theme,
} from '@eva-design/eva';

import  ChartScreen  from './components/ChartScreen';

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const ChartStack = createStackNavigator();

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <StatusBar backgroundColor="#BDBDBD" />
      <NavigationContainer>
        <ChartStack.Navigator initialRouteName="ChartScreen">
          <ChartStack.Screen
            name="ChartScreen"
            component={ChartScreen}
            options={{
              title: "Jarecky",
              headerRight: () => (
                <Button
                  style={styles.aboutButton}
                  onPress={() => alert('This is a button!')}
                  icon={() => 
                    <Icon
                      name="info-outline"
                      fill={'black'}
                    />
                  }
                />
              )
            }}
          />
        </ChartStack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  aboutButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  text: {
    textAlign: 'center',
  }
});

export default App;
import React from 'react';

import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {
  mapping,
  light as theme,
} from '@eva-design/eva';

import  ChartScreen  from './components/ChartScreen';
import  AboutScreen  from './components/AboutScreen';

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"

const ChartStack = createStackNavigator();

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <NavigationContainer>
        <ChartStack.Navigator 
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <ChartStack.Screen
            name="ChartScreen"
            component={ChartScreen}
          />
          <ChartStack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{
              title: "Acerca de"
            }}
          />
        </ChartStack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);

export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';

import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  dark as theme,
} from '@eva-design/eva';

import  ChartScreen  from './components/ChartScreen';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <StatusBar backgroundColor={theme['color-primary-900']} />
      <Layout style={styles.container}>
        <ChartScreen/>
      </Layout>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  }
});

export default App;

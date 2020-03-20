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
      <StatusBar backgroundColor="#101426" />
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
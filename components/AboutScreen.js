import React from 'react'

import { StyleSheet } from 'react-native'

import {
    Layout,
    Text,
    Avatar
} from '@ui-kitten/components'

const AboutScreen = () => (
  <Layout style={styles.container}>
    <Layout style={styles.titleLayout}>
      <Avatar style={styles.logo} size='large' source={require('../assets/jarecky-logo.png')}/>
      <Text style={styles.title} category='h1'>Jarecky</Text>
    </Layout>
    <Text style={styles.title} category="h5">Desarrolladores</Text>
    <Text style={styles.text} category="s2">Alfredo Baquedano</Text>
    <Text style={styles.text} category="s2">Fernando Mella</Text>
    <Text style={styles.title} category="h5">Colaborador</Text>
    <Text style={styles.text} category="s2">David Pastor</Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  titleLayout: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
    margin:4
  },
  title: {
    marginTop: 16,
  },
  text: {
    margin: 0,
  },
});

export default AboutScreen;
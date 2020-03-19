import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
    Layout,
    Button,
} from '@ui-kitten/components';

export default class ChartScreen extends Component {

    render() {
        return (
        <Layout style={styles.container}>
            <Layout style={styles.chartLayour}>

            </Layout>
            <Layout style={styles.chartControlLayour}>
                <Button style={styles.chartControlButtonUp}>
                </Button>
                <Button style={styles.chartControlButtonDown}>
                </Button>
                <Button style={styles.chartControlButtonStill}>
                </Button>
            </Layout>
        </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartControlLayour: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartLayour: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartControlButtonUp: {
        backgroundColor: 'green',
        borderColor: 'green',
        margin: 20
    },
    chartControlButtonDown: {
        backgroundColor: 'red',
        borderColor: 'red',
        margin: 20
    },
    chartControlButtonStill: {
        backgroundColor: 'white',
        borderColor: 'white',
        margin: 20
    }
});
import React, { useState } from 'react';

import { StyleSheet, processColor } from 'react-native';

/*
import {
    BarChart
} from "react-native-chart-kit";
*/

import { CandleStickChart } from 'react-native-charts-wrapper';

import {
    Layout,
    Button,
} from '@ui-kitten/components';

import {
    dark as theme,
} from '@eva-design/eva';

const ChartScreen = () => {

    const [chartWidth, setChartWidth] = useState(400);
    const [chartHeight, setChartHeight] = useState(200);

    const legend = {
        enabled: false,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
    }
    const [chartData, setChartData] = useState({
        dataSets: [{
            values: [
                {shadowH: 1, shadowL: 0, open: 1, close: 0},
                {shadowH: 2, shadowL: 1, open: 2, close: 1},
                {shadowH: 3, shadowL: 2, open: 3, close: 2},
                {shadowH: 2, shadowL: 3, open: 2, close: 3},
                {shadowH: 1, shadowL: 2, open: 1, close: 2},
                {shadowH: 2, shadowL: 1, open: 2, close: 1},
            ],
            label: 'AAPL',
            config: {
                highlightColor: processColor('darkgray'),

                shadowColor: processColor('black'),
                shadowWidth: 1,
                shadowColorSameAsCandle: true,
                increasingColor: processColor('#71BD6A'),
                increasingPaintStyle: 'FILL',
                decreasingColor: processColor('#D14B5A')
            },
            xAxis: {},
            yAxis: {}
        }],
    })
    const marker = {
        enabled: true,
        markerColor: processColor('#2c3e50'),
        textColor: processColor('white'),
    }

    return (
        <Layout style={styles.container} onLayout={(event) => {
            setChartHeight(event.nativeEvent.layout.height)
        }}>
            <Layout style={styles.chartLayour} onLayout={(event) => {
                setChartWidth(event.nativeEvent.layout.width)
            }}>
            <CandleStickChart
                style={{height: chartHeight, width: chartWidth}}
                data={chartData}
                marker={marker}
                chartDescription={{text: 'CandleStick'}}
                legend={legend}
                xAxis={{}}
                yAxis={{}}
                maxVisibleValueCount={16}
                autoScaleMinMaxEnabled={true}
                zoom={{scaleX: 1, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
            />
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartControlLayour: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartLayour: {
        flexGrow: 1,
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
    },
    chart: {
        flex: 1
    }
});

export default ChartScreen
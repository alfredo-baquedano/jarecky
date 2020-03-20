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

import set from 'lodash'

const increasingColor = "#2ECC71"
const decreasingColor = "#E74C3C"

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
                {shadowH: 0, shadowL: 1, open: 0, close: 1},
                {shadowH: 1, shadowL: 1, open: 1, close: 1},
                {shadowH: 1, shadowL: 2, open: 1, close: 2},
                {shadowH: 2, shadowL: 2, open: 2, close: 2},
                {shadowH: 2, shadowL: 2, open: 2, close: 2},
                {shadowH: 2, shadowL: 3, open: 2, close: 3},
                {shadowH: 3, shadowL: 2, open: 3, close: 2},
                {shadowH: 2, shadowL: 1, open: 2, close: 1},
                {shadowH: 1, shadowL: 2, open: 1, close: 2},
                {shadowH: 2, shadowL: 3, open: 2, close: 3},
                {shadowH: 3, shadowL: 4, open: 3, close: 4},
                {shadowH: 4, shadowL: 4, open: 4, close: 4},
                {shadowH: 4, shadowL: 5, open: 4, close: 5},
                {shadowH: 5, shadowL: 4, open: 5, close: 4},
                {shadowH: 4, shadowL: 4, open: 4, close: 4},
                {shadowH: 4, shadowL: 3, open: 4, close: 3},
                {shadowH: 3, shadowL: 3, open: 3, close: 3},
                {shadowH: 3, shadowL: 3, open: 3, close: 3},
                {shadowH: 3, shadowL: 2, open: 3, close: 2},
                {shadowH: 2, shadowL: 1, open: 2, close: 1},
                {shadowH: 1, shadowL: 0, open: 1, close: 0},
                {shadowH: 0, shadowL: 0, open: 0, close: 0},
                {shadowH: 0, shadowL: 1, open: 0, close: 1}
            ],
            label: 'AAPL',
            config: {
                highlightColor: processColor('darkgray'),
                shadowColor: processColor('white'),
                shadowWidth: 1,
                shadowColorSameAsCandle: true,
                increasingColor: processColor(increasingColor),
                increasingPaintStyle: 'FILL',
                decreasingColor: processColor(decreasingColor),
                neutralColor: processColor('white')
            },
            xAxis: {
                drawLabels: false
            },
            yAxis: {
                drawLabels: false
            }
        }],
    })

    const marker = {
        enabled: true,
        markerColor: processColor('#2c3e50'),
        textColor: processColor('white'),
    }

    const handleUpButton = () => {
        let lastValue = chartData.dataSets[0].values[chartData.dataSets[0].values.length - 1]
        const dataSets = [{ ...chartData.dataSets[0], values: [...chartData.dataSets[0].values,
            {
                shadowH: lastValue.close,
                shadowL: lastValue.close + 1,
                open: lastValue.close,
                close: lastValue.close + 1
            }
        ]}]
        newChartData = {...chartData, dataSets}
        console.log('newChartData', newChartData)
        setChartData(newChartData)
    }

    const handleDownButton = () => {
        let lastValue = chartData.dataSets[0].values[chartData.dataSets[0].values.length - 1]
        const dataSets = [{ ...chartData.dataSets[0], values: [...chartData.dataSets[0].values,
            {
                shadowH: lastValue.close,
                shadowL: lastValue.close - 1,
                open: lastValue.close,
                close: lastValue.close - 1
            }
        ]}]
        newChartData = {...chartData, dataSets}
        console.log('newChartData', newChartData)
        setChartData(newChartData)
    }

    const handleNeutralButton = () => {
        let lastValue = chartData.dataSets[0].values[chartData.dataSets[0].values.length - 1]
        const dataSets = [{ ...chartData.dataSets[0], values: [...chartData.dataSets[0].values,
            {
                shadowH: lastValue.close,
                shadowL: lastValue.close,
                open: lastValue.close,
                close: lastValue.close
            }
        ]}]
        newChartData = {...chartData, dataSets}
        console.log('newChartData', newChartData)
        setChartData(newChartData)
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
                chartDescription={{text: ''}}
                legend={legend}
                xAxis={{drawLabels: false}}
                yAxis={{drawLabels: false}}
                maxVisibleValueCount={16}
                autoScaleMinMaxEnabled={true}
                zoom={{scaleX: 1, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
            />
            </Layout>
            <Layout style={styles.chartControlLayour}>
                <Button style={styles.chartControlButtonUp} onPress={handleUpButton}>
                </Button>
                <Button style={styles.chartControlButtonNeutral} onPress={handleNeutralButton}>
                </Button>
                <Button style={styles.chartControlButtonDown} onPress={handleDownButton}>
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
        backgroundColor: increasingColor,
        borderColor: increasingColor,
        margin: 20
    },
    chartControlButtonDown: {
        backgroundColor: decreasingColor,
        borderColor: decreasingColor,
        margin: 20
    },
    chartControlButtonNeutral: {
        backgroundColor: 'white',
        borderColor: 'white',
        margin: 20
    },
    chart: {
        flex: 1
    }
});

export default ChartScreen
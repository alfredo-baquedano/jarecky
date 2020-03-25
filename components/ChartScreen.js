import React, { useState } from 'react'

import { StyleSheet, processColor } from 'react-native'

import { CandleStickChart } from 'react-native-charts-wrapper'

import {
    Layout,
    Button,
    Icon,
} from '@ui-kitten/components'

const increasingColor = '#2ECC71'
const decreasingColor = '#E74C3C'

const backgroundColor = '#151A30'

const ChartScreen = () => {

    const [chartWidth, setChartWidth] = useState(400)
    const [chartHeight, setChartHeight] = useState(200)

    const legend = {
        enabled: false,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
    }

    const initialChartData = {
        dataSets: [{
            values: [
                {shadowH: 0, shadowL: 0, open: 0, close: 0, marker: 'pivot'}
            ],
            label: 'AAPL',
            config: {
                drawVerticalHighlightIndicator: false,
                drawHorizontalHighlightIndicator: true,
                highlightColor: processColor('red'),
                shadowColor: processColor('white'),
                shadowColorSameAsCandle: false,
                touchEnabled: false,
                drawValues: false,
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
    }

    const [chartData, setChartData] = useState(initialChartData)

    const xAxis = {
        enabled: false
    }
    const yAxis = {
        left: {
            drawLabels: false,
            drawAxisLine: false,
            drawGridLines: true
        },
        right: {
            enabled: false
        }
    }

    const marker = {
        enabled: false,
        markerColor: processColor('rgba(0, 0, 0, 0.4)'),
        textColor: processColor('white')
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
        renderPivots(newChartData)
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
        renderPivots(newChartData)
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
        renderPivots(newChartData)
    }

    const renderPivots = (updatedChartData) => {
        let values = updatedChartData.dataSets[0].values
        let consecutiveVariation = 0
        let hill = false
        
        let pivots = []
        let pivotCandidate

        values.forEach((value, index) => {
            if (index !== 0) {
                if (value.close > values[index-1].close) {
                    if (consecutiveVariation > 0) {
                        consecutiveVariation++
                    } else {
                        if (consecutiveVariation > 3) {
                            hill = false
                        } else {
                            pivotCandidate = index
                        }
                        consecutiveVariation = 1
                    }
                    if (consecutiveVariation === 3) {
                        if (hill === true) {
                            pivots.push({ index: pivotCandidate, hill: 'down' })
                        }
                        hill = true
                    }
                }
                if (value.close < values[index-1].close) {
                    if (consecutiveVariation < 0) {
                        consecutiveVariation--
                    } else {
                        if (consecutiveVariation < -3) {
                            hill = false
                        } else {
                            pivotCandidate = index
                        }
                        consecutiveVariation = -1
                    }
                    if (consecutiveVariation === -3) {
                        if (hill === true) {
                            pivots.push({ index: pivotCandidate, hill: 'up' })
                        }
                        hill = true
                    }
                }
                console.log('consecutiveVariation', consecutiveVariation)
                console.log('hill', hill)
            }
        })

        let auxValues = [...updatedChartData.dataSets[0].values]

        pivots.forEach(value => {
            auxValues[value.index] = {
                ...auxValues[value.index],
                shadowH: auxValues[value.index].open + (value.hill === 'up'? 0.2 : -0.2)
            }
        })

        const dataSets = [{ ...updatedChartData.dataSets[0], values: auxValues}]

        newChartData = {...updatedChartData, dataSets}

        setChartData(newChartData)
    }

    const resetChart = () => {
        setChartData(initialChartData)
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
                    dragDecelerationEnabled={false}
                    legend={legend}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    visibleRange={{x: {min: 10} }}
                    maxVisibleValueCount={16}
                    autoScaleMinMaxEnabled={true}
                    zoom={{scaleX: 1, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
                    onChange={(event) => console.log(event.nativeEvent)}
            />
            </Layout>
            <Layout style={styles.chartControlLayour}>
                <Button
                    style={styles.chartControlButtonReset}
                    icon={() => <Icon
                        style={{marginLeft: 0, marginRight: 0}}
                        name="trash-2-outline"
                        fill={decreasingColor}
                    />}
                    onPress={resetChart}>
                    </Button>
                <Button
                    style={styles.chartControlButtonUp}
                    onPress={handleUpButton}>
                </Button>
                <Button
                    style={styles.chartControlButtonNeutral}
                    onPress={handleNeutralButton}>
                </Button>
                <Button
                    style={styles.chartControlButtonDown}
                    onPress={handleDownButton}>
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
        backgroundColor
    },
    chartControlLayour: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
    },
    chartLayour: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
    },
    chartControlButtonReset: {
        backgroundColor: 'transparent',
        borderColor: decreasingColor,
        margin: 20,
        padding: 0,
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
import React, { useState } from 'react'

import { StyleSheet, processColor } from 'react-native'

import { CandleStickChart } from 'react-native-charts-wrapper'

import {
    Layout,
    Button,
    Icon,
    Text,
    Avatar
} from '@ui-kitten/components'

import { useNavigation } from '@react-navigation/native';

const increasingColor = '#388E3C'
const decreasingColor = '#E53935'

const backgroundColor = '#FAFAFA'
const chartBackgroundColor = '#FAFAFA'

const ChartScreen = () => {

    const navigation = useNavigation()

    navigation.setOptions({
        headerTitle: props => (
        <Layout style={styles.titleLayout}>
            <Avatar style={{margin: 8}} size="tiny" source={require('../assets/jarecky-logo.png')}/>
            <Text category='h5'>Jarecky</Text>
        </Layout>
        ),
        headerRight: () => (
        <Button
            style={styles.aboutButton}
            onPress={() => navigation.push('AboutScreen')}
            icon={() => 
            <Icon
                name="info-outline"
                fill={'black'}
            />
            }
        />
        )
    })

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
                shadowColor: processColor('black'),
                shadowColorSameAsCandle: false,
                touchEnabled: false,
                drawValues: false,
                shadowWidth: 1.5,
                increasingColor: processColor(increasingColor),
                increasingPaintStyle: 'FILL',
                decreasingColor: processColor(decreasingColor),
                decreasingPaintStyle: 'FILL',
                neutralColor: processColor('black')
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
                shadowL: lastValue.close,
                open: lastValue.close,
                close: lastValue.close + 1
            }
        ]}]
        newChartData = {...chartData, dataSets}
        renderPivots(newChartData)
    }

    const handleDownButton = () => {
        let lastValue = chartData.dataSets[0].values[chartData.dataSets[0].values.length - 1]
        const dataSets = [{ ...chartData.dataSets[0], values: [...chartData.dataSets[0].values,
            {
                shadowH: lastValue.close,
                shadowL: lastValue.close,
                open: lastValue.close,
                close: lastValue.close - 1
            }
        ]}]
        newChartData = {...chartData, dataSets}
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
        renderPivots(newChartData)
    }

    const renderPivots = (updatedChartData) => {
        let auxValues = [...updatedChartData.dataSets[0].values]
        let consecutiveIncrease = 0
        let consecutiveDecrease = 0
        
        let pivots = []
        let pivotCandidate

        let valuesWithDetails = auxValues.map((value, index) => ({
            ...value,
            index: index-1,
            variability: value.open > value.close? 'decreasing' : (value.open < value.close)? 'increasing' : 'neutral'
        }))

        const pivotVariation = 2
        const permitedVariation = 1

        let variability = 'neutral'

        valuesWithDetails.forEach((value) => {
            if (value.variability === 'increasing') {
                if (variability === 'decreasing') {
                    pivotCandidate = value
                }

                consecutiveIncrease++
                consecutiveDecrease = 0
                
                if (consecutiveIncrease >= pivotVariation) {
                    variability = 'increasing'
                    if (pivotCandidate !== undefined) {
                        pivots.push(pivotCandidate)
                        pivotCandidate = undefined
                    }
                } else {
                    if (consecutiveIncrease > permitedVariation ) {
                        variability = 'neutral'
                        pivotCandidate = undefined
                    }
                }
            }
            if (value.variability === 'decreasing') {
                if (variability === 'increasing') {
                    pivotCandidate = value
                }

                consecutiveDecrease++
                consecutiveIncrease = 0

                if (consecutiveDecrease >= pivotVariation) {
                    variability = 'decreasing'
                    if (pivotCandidate !== undefined) {
                        pivots.push(pivotCandidate)
                        pivotCandidate = undefined
                    }
                } else {
                    if (consecutiveDecrease > permitedVariation ) {
                        variability = 'neutral'
                        pivotCandidate = undefined
                    }
                }
            }
            /*
            console.log('consecutiveIncrease', consecutiveIncrease)
            console.log('consecutiveDecrease', consecutiveDecrease)
            console.log('variability', variability)
            console.log('pivotCandidate', pivotCandidate)
            console.log('valuesWithDetails', valuesWithDetails)
            */
        })

        pivots.forEach(value => {
            auxValues[value.index] = {
                ...auxValues[value.index],
                shadowH: auxValues[value.index].open + (value.variability === 'decreasing'? 0.2 : 0),
                shadowL: auxValues[value.index].open + (value.variability === 'increasing'? -0.2 : 0)
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
                    visibleRange={{x: {min: 40}}}
                    maxVisibleValueCount={16}
                    autoScaleMinMaxEnabled={true}
                    drawBorders
                    borderColor={processColor('grey')}
                    drawGridBackground
                    gridBackgroundColor={processColor(chartBackgroundColor)}
                    animation={{ durationX: 250, durationY: 250, easingX: 'easeInOut', easingY: 'easeInOut'}}
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
    titleLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
    },
    aboutButton: {
      backgroundColor: 'transparent',
      borderColor: 'transparent'
    },
    chartControlLayour: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        marginTop: 20
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
        margin: 20
    },
    chartControlButtonUp: {
        backgroundColor: increasingColor,
        borderColor: 'black',
        margin: 20
    },
    chartControlButtonDown: {
        backgroundColor: decreasingColor,
        borderColor: 'black',
        margin: 20
    },
    chartControlButtonNeutral: {
        backgroundColor: 'transparent',
        borderColor: 'black',
        margin: 20
    },
    chart: {
        flex: 1
    }
});

export default ChartScreen
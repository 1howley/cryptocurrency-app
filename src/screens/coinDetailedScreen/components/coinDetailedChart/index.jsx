import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CoinDetailedChart = (props) => {

    const { prices, pricePercent } = props;

    const percentageColor = pricePercent < 0 ? '#ea3943' : '#16c784'

    const screenWidth = Dimensions.get('window').width

    return (
        <GestureHandlerRootView>

            <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                <LineChart width={screenWidth - 10} height={200}>
                    <LineChart.Path color={percentageColor} width={2} animateOnMount="foreground"/>
                    <LineChart.CursorCrosshair color={percentageColor}>
                        <LineChart.Tooltip textStyle={{
                            backgroundColor: 'black',
                            borderRadius: 4,
                            color: 'white',
                            fontSize: 18,
                            padding: 4,
                        }} />
                        <LineChart.Tooltip position="bottom" >
                            <LineChart.DatetimeText style={{
                                backgroundColor: 'black',
                                borderRadius: 4,
                                color: 'white',
                                fontSize: 18,
                                padding: 4,
                            }} />
                        </LineChart.Tooltip>
                    </LineChart.CursorCrosshair>
                </LineChart>
            </LineChart.Provider>

        </GestureHandlerRootView>
    );
}

export default CoinDetailedChart;
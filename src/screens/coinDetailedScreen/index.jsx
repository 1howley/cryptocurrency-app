import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import CoinDetailedHeader from "./components/coinDetailedHeader";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import CoinDetailedChart from "./components/coinDetailedChart";
import { useRoute } from "@react-navigation/native";
import { getDetailedCoindData, getMarketChart } from "../../services/requests";

const CoinDetailedScreen = () => {

    const [coinValue, setCoinValue] = useState("1")
    const [coin, setCoin] = useState(null)
    const [coinMarketData, setCoinMarketData] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [usdValue, setUsdValue] = useState("")


    const chanceCoinValue = (value) => {

        setCoinValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setUsdValue((floatValue * current_price.usd).toString())

    }
    const chanceUsdValue = (value) => {

        setUsdValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setCoinValue((floatValue / current_price.usd).toString())

    }

    const route = useRoute();
    const { params: { coinId } } = route

    const fetchCoinData = async () => {
        setLoading(true)
        const fetchedCoinData = await getDetailedCoindData(coinId)
        const fetchedMarketData = await getMarketChart(coinId)
        setCoinMarketData(fetchedMarketData)
        setCoin(fetchedCoinData)
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString())
        setLoading(false)
    }

    useEffect(() => {
        fetchCoinData()
    }, [])
    
    if (loading || !coin || !coinMarketData) {
        return <ActivityIndicator size='large'/>
    }

    const {
        image: { small },
        name,
        symbol,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h
        }
    } = coin;

    const { prices } = coinMarketData
    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784'

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <CoinDetailedHeader
                image={small}
                symbol={symbol}
                marketCapRank={market_cap_rank}
            />
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.currentPrice}>${current_price.usd}</Text>
                </View>
                <View style={{ backgroundColor: percentageColor, padding: 7, borderRadius: 5, flexDirection: 'row' }}>
                    <AntDesign
                        name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
                        size={12}
                        color={"white"}
                        style={{ alignSelf: 'center', marginRight: 3 }}
                    />
                    <Text style={styles.priceChange}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            <CoinDetailedChart prices={prices} pricePercent={price_change_percentage_24h} />
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{symbol.toUpperCase()}</Text>
                    <TextInput
                        style={styles.input}
                        value={coinValue}
                        keyboardType="numeric"
                        onChangeText={chanceCoinValue}
                    />
                </View>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>USD</Text>
                    <TextInput
                        style={styles.input}
                        value={usdValue}
                        keyboardType="numeric"
                        onChangeText={chanceUsdValue}
                    />
                </View>

            </View>
        </View>
    );

};

export default CoinDetailedScreen;
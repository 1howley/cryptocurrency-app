import React from "react";
import { Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";

const CoinItem = ({ marketCoin }) => {

    const { 
        name, 
        current_price,
        market_cap_rank, 
        price_change_percentage_24h, 
        symbol, 
        market_cap,
        image,
    } = marketCoin;

    const porcentageColor = price_change_percentage_24h < 0? '#ea3943': '#16c784'

    const normalizeMarketCap = (marketCap) => {
        if (marketCap > 1_000_000_000_000) {
            return `${Math.floor(marketCap / 1_000_000_000_000)} T`
        } if (marketCap > 1_000_000_000) {
            return `${Math.floor(marketCap / 1_000_000_000)} B`
        } if (marketCap > 1_000_000) {
            return `${Math.floor(marketCap / 1_000_000)} M`
        } if (marketCap > 1_000) {
            return `${Math.floor(marketCap / 1_000)} K`
        } 

        return marketCap
    }

    return (
        <View style={styles.coinContainer}>
            <Image
                src = { image }
                style={{ height: 30, width: 30, marginRight: 10, alignSelf: 'center' }}
            />
            <View>
                <Text style={styles.title}>{name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.rank}>{market_cap_rank}</Text>
                    <Text style={styles.text}>{symbol.toUpperCase()}</Text>
                    <AntDesign
                        name={price_change_percentage_24h < 0? 'caretdown': 'caretup'}
                        size={12}
                        color={porcentageColor}
                        style={{ alignSelf: 'center', marginRight: 3 }}
                    />
                    <Text style={{ color: porcentageColor}}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={{ marginLeft: 'auto', alignItems: 'flex-end'}}>
                <Text style={styles.title}>{current_price}</Text>
                <Text style={{color: 'white'}}>MCap {normalizeMarketCap(market_cap)}</Text>
            </View>
        </View>
    )
}

export default CoinItem
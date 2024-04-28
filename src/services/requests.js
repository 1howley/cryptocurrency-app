import axios from "axios";
import { COINGECKO_KEY } from '@env'

export const getDetailedCoindData = async (coinId) => {
    
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
        const options = {
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': `${COINGECKO_KEY}`
            }
        };

        const response = await axios.get(url, options);

        return response.data;

    } catch (e) {
        console.log('> request error: ' + e)
    }
} 

export const getMarketChart = async (coinId) => {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&precision=10`;
        const options = {
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': `${COINGECKO_KEY}`
            }
        };

        const response = await axios.get(url, options);
        return response.data;

    } catch (e) {
        console.log('> request error: ' + e)
    }
}

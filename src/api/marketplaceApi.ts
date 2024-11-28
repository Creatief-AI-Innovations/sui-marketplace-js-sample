import MarketplaceSDK from '@creatief/suisdk';

console.log('REACT APP MARKETPLACE API URL');
console.log(import.meta.env)

export const marketplaceApi = new MarketplaceSDK({
    baseURL: import.meta.env.VITE_MARKETPLACE_API_URL + '/api',
    apiKey: import.meta.env.VITE_MARKETPLACE_API_KEY,
});
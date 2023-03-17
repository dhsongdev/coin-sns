const BASE_URL = 'https://api.coinpaprika.com/v1';
const COINS_URL = `${BASE_URL}/coins`;

export const fetchCoins = async () => {
  const data = await fetch(COINS_URL);
  return data.json();
};

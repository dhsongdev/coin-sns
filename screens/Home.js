import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Alert,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useQuery } from 'react-query';

//context
import userContext from '../userContext';

//fetcher
import { fetchCoins } from '../apiFetchs';

const WINDOW_WIDTH = Dimensions.get('window').width;
const BLOCK_WIDTH = (WINDOW_WIDTH * 5) / 6 / 3;
const remainedSpace = WINDOW_WIDTH - BLOCK_WIDTH * 3;

const Coin = ({ item }) => {
  const [noImage, setNoImage] = useState(false);
  return (
    <TouchableOpacity style={styles.coinContainer}>
      {noImage ? (
        <Image
          style={styles.coinImage}
          source={require('../assets/No_img.png')}
        />
      ) : (
        <Image
          style={styles.coinImage}
          source={{
            uri: `https://static.coinpaprika.com/coin/${item.id}/logo.png`,
          }}
          onError={() => {
            setNoImage(true);
          }}
        />
      )}
      <View
        style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ textAlign: 'center', fontSize: 10 }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Home({ navigation: { setOptions } }) {
  const user = useContext(userContext);
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading } = useQuery(['coins'], fetchCoins);

  useEffect(() => {
    if (data) {
      const filtered = data
        .filter(
          (item) =>
            item.rank !== 0 && item.is_active === true && item.is_new === false
        )
        .slice(0, 201);
      setFilteredData(filtered);
    }
  }, [data]);

  return !user ? null : (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator />
          <Text>getting some coins...</Text>
        </View>
      ) : (
        <FlatList
          windowSize={30}
          contentContainerStyle={{
            paddingHorizontal: remainedSpace / 8,
            paddingVertical: remainedSpace / 4,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: remainedSpace / 4 }}></View>
          )}
          data={filteredData}
          renderItem={({ item }) => <Coin item={item} />}
          numColumns={3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinContainer: {
    width: BLOCK_WIDTH,
    height: BLOCK_WIDTH,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: remainedSpace / 8,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
});

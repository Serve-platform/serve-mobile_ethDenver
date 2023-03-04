import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '~/components/Button';
import React from 'react';
import {StoreProps} from '@navigators/stackNav/StoreStackNav';
import theme from '@styles/color';
import Wallet from '@assets/images/wallet.png';

const Store = ({}: StoreProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" source={Wallet} style={styles.image} />
        </View>
        <View style={styles.wallet}>
          <Button title={`내 지갑 정보`} type={`white`} />
        </View>
        <View style={styles.balance}>
          <Text style={styles.label}>잔액</Text>
          <View>
            <Text style={styles.coins}>47205</Text>
            <View style={styles.highlight} />
          </View>
          <Text style={styles.seat}>Seat</Text>
        </View>
      </View>

      <Button title={`전환하기`} type={`yellow`} style={styles.button} />
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginTop: 140,
    backgroundColor: theme.color.white,
    borderColor: theme.color.main,
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.color.black,
    height: 240,
  },
  imageContainer: {
    position: 'absolute',
    top: -110,
    width: 200,
    height: 200,
    backgroundColor: theme.color.black,
    borderColor: theme.color.main,
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 15,
    color: theme.color.black,
  },
  image: {
    position: 'absolute',
    top: 30,
    left: 52,
    width: 94,
    height: 114,
  },
  wallet: {
    position: 'absolute',
    top: -150,
    width: 200,
    marginTop: 200,
  },
  balance: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: theme.color.black,
    marginRight: 50,
  },
  coins: {
    fontSize: 40,
    color: theme.color.black,
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  highlight: {
    width: '100%',
    height: 13,
    backgroundColor: theme.color.main,
    position: 'absolute',
    bottom: 8,
  },
  seat: {
    fontSize: 18,
    color: theme.color.black,
    marginLeft: 16,
  },
  button: {
    marginTop: 40,
  },
});

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '~/styles/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmDealByPasswordProps } from '@navigators/GlobalNav';
import { remove } from '@assets/icons';
import { useMutation } from 'react-query';
import { patchSeatBySeatId, StateType } from '~/api';

const ConfirmDealByPassword = () => {
  const navigation = useNavigation<ConfirmDealByPasswordProps>();

  const { params } = useRoute();
  // @ts-ignore
  const seatId = JSON.parse(params?.seatId);

  const [index, setIndex] = useState(0);
  const [passwords, setPasswords] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const patchSeatBySeatIdMutation = useMutation(
    'patchSeatBySeatId',
    ({ seatId, state }: { seatId: number; state: StateType }) =>
      patchSeatBySeatId(seatId, state),
  );

  const push = (number: number) => {
    let password = [...passwords];
    // @ts-ignore
    password[index] = number;
    setPasswords(password);
    setIndex(index + 1);
  };

  const pop = () => {
    let password = [...passwords];
    password[index - 1] = null;
    setPasswords(password);
    setIndex(index - 1);
  };

  useEffect(() => {
    if (passwords[5] != null) {
      patchSeatBySeatIdMutation.mutate({
        seatId: seatId,
        state: 0,
      });

      // @ts-ignore
      navigation.navigate('StoreStackNav');
    }
  }, [passwords]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>비밀번호를 입력하세요</Text>

        <View style={styles.markWrapper}>
          {passwords.map((password, i) => (
            <Text
              key={i}
              style={[
                styles.mark,
                password != null
                  ? {
                      backgroundColor: theme.color.white,
                    }
                  : {},
              ]}></Text>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          <TouchableOpacity style={styles.button} onPress={() => push(1)}>
            <Text style={styles.number}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(2)}>
            <Text style={styles.number}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(3)}>
            <Text style={styles.number}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(4)}>
            <Text style={styles.number}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(5)}>
            <Text style={styles.number}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(6)}>
            <Text style={styles.number}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(7)}>
            <Text style={styles.number}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(8)}>
            <Text style={styles.number}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(9)}>
            <Text style={styles.number}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBorderButton}>
            <Text style={styles.number}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBorderButton} onPress={() => pop()}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={remove}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDealByPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  wrapper: {
    marginTop: 80,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: theme.color.white,
  },
  markWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    color: theme.color.white,
  },
  mark: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: theme.color.white,
    borderStyle: 'solid',
    borderRadius: 12,
    width: 24,
    height: 24,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.color.white,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.color.main,
    borderStyle: 'solid',
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBorderButton: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    color: theme.color.main,
    fontWeight: 'bold',
  },
});
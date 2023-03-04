import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import theme from '~/styles/color';
import {onboarding} from '~/assets/images';
import {downArrow} from '~/assets/icons';
import OnModal from '~/components/Home/OnModal';
import OffModal from '~/components/Home/OffModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getQrSvg} from '~/api';
import {useQuery} from 'react-query';
import {HomeStackNavProps} from '~/navigators/stackNav/HomeStackNav';
import {useNavigation} from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import useBluetooth from '~/hooks/useBluetooth';
import {useSetRecoilState} from 'recoil';
import {modalState} from '~/recoils/atoms';

const Home = () => {
  const navigation = useNavigation<HomeStackNavProps>();
  const setModalOpen = useSetRecoilState(modalState);
  const [onServe, setOnServe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [onModalVisible, setOnModalVisible] = useState(false);
  const moveAnim = useRef(new Animated.Value(-2)).current;
  const [qrData, setQrData] = useState('');
  const [nickName, setNickName] = useState(null);

  const {onAdvertiseStart, onAdvertiseStop} = useBluetooth();

  const moveQr = () => {
    setOnModalVisible(!onModalVisible);
    navigation.navigate('QrScan');
  };
  const balance = 1;
  const token = 'abc';

  const getQrSvgQuery = useQuery(
    ['getQrSvg', token],
    async () => {
      const address = await AsyncStorage.getItem('Address');

      if (address) {
        const result = await getQrSvg({
          // token,
          address,
          balance,
        });
        return result;
      }
    },
    {enabled: !!token},
  );

  const moveQrCode = () => {
    setModalVisible(!modalVisible);
    const qrSvg = getQrSvgQuery.data;
    setQrData(qrSvg);
    navigation.navigate('QrScreen', {
      qrData: qrSvg,
    });
  };

  const onAdvertise = async () => {
    setModalOpen({
      children: (
        <View
          style={{
            width: 320,
            height: 290,
            backgroundColor: theme.color.white,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-around',
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: theme.color.black,
                fontWeight: '700',
                fontSize: 20,
                marginTop: 20,
              }}>
              Nick Name
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontWeight: '600',
                fontSize: 14,
              }}>
              의 양보 요청 수락
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontWeight: '600',
                fontSize: 14,
              }}>
              ~~의 좌석으로 이동하세요
            </Text>
          </View>
          <View style={{position: 'absolute', bottom: 250}}>
            <Image
              source={avatar}
              style={{
                width: 80,
                height: 80,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#EFFF37',
              width: 275,
              height: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
            }}
            onPress={() => {}}>
            <Text style={{fontSize: 18, color: theme.color.black}}>
              거래하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: theme.color.black}}>거절</Text>
          </TouchableOpacity>
        </View>
      ),
      isOpen: true,
    });

    const currentServeState = !onServe;

    setOnServe(currentServeState);

    if (currentServeState) {
      const uuid = await AsyncStorage.getItem('uuid');
      uuid && onAdvertiseStart(uuid);
    } else {
      onAdvertiseStop();
    }
  };

  const moveOn = () => {
    Animated.timing(moveAnim, {
      toValue: 92,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const moveOff = () => {
    Animated.timing(moveAnim, {
      toValue: -2,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const getNickName = async () => {
    const nickName = await AsyncStorage.getItem('nickName');
    // @ts-ignore
    setNickName(nickName);
  };

  useEffect(() => {
    getNickName().then();
  }, []);

  useEffect(() => {
    if (onServe) {
      moveOn();
    } else {
      moveOff();
    }
  }, [onServe]);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.title}>
            Hi,
            <Text style={{color: theme.color.main}}> {nickName}!</Text>
          </Text>
          <Text
            style={{
              marginTop: 14,
              color: theme.color.white,
              fontWeight: '500',
            }}>
            Lv1
          </Text>
        </View>

        <View
          style={{
            width: 46,
            height: 46,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 46,
          }}
        />
      </View>
      <Image
        source={onboarding}
        style={{
          marginVertical: 24,
          alignSelf: 'center',
          width: (206 / 360) * Dimensions.get('window').width,
          height: (206 / 760) * Dimensions.get('window').height,
        }}
      />
      {/* 탑승 정보 */}
      <Pressable
        onPress={() => {
          navigation.navigate('BoardingInfo');
        }}
        style={[
          styles.boardInfo,
          {
            backgroundColor: onServe
              ? theme.color.black
              : 'rgba(245, 245, 245, 0.4)',
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            top: -18,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 20,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: theme.color.black,
          }}>
          <Text style={{color: theme.color.main, fontWeight: '700'}}>
            {onServe ? 'Edit' : 'Enter'} Boarding Info.
          </Text>
        </View>
        {onServe ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <TextTicker
              style={{
                fontSize: 20,
                color: theme.color.white,
              }}
              duration={3000}
              loop
              bounce={false}>
              서울메트로 2호선 3386열차 3호칸 탑승 중
            </TextTicker>
          </View>
        ) : (
          <Text style={{fontSize: 20, color: theme.color.white}}>
            탑승 정보 입력
          </Text>
        )}
      </Pressable>

      {/* SERVE 드래그 버튼 */}
      <View style={styles.dragContainer}>
        <>
          <Pressable onPress={onAdvertise}>
            <Animated.View
              style={[
                styles.dragEnableButton,
                {
                  left: -2,
                  backgroundColor: onServe
                    ? theme.color.main
                    : theme.color.black,
                  transform: [{translateY: moveAnim}],
                },
              ]}>
              <Text
                style={[
                  styles.dragEnableText,
                  {
                    color: onServe ? theme.color.black : theme.color.main,
                  },
                ]}>
                {onServe ? 'On SERVE' : 'Off SERVE'}
              </Text>
            </Animated.View>
          </Pressable>
          <View style={[styles.dragDisableButton, {top: -2, left: -2}]}>
            <Text style={styles.dragDisableText}>Drag to cancel</Text>
          </View>
          <Image
            source={downArrow}
            style={{
              width: 24,
              height: 24,
              zIndex: -1,
              alignSelf: 'center',
              transform: [{rotate: onServe ? '180deg' : '0deg'}],
            }}
          />
          <View style={[styles.dragDisableButton, {bottom: -2, left: -2}]}>
            <Text style={styles.dragDisableText}>Drag to SERVE</Text>
          </View>
        </>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: theme.color.white,
  },
  boardInfo: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: theme.color.grayscale.D9D9D9,
    paddingVertical: 18,
    alignItems: 'center',
  },
  dragContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 90,
    height: 164,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.color.main,
    borderStyle: 'dashed',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  dragEnableButton: {
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: theme.color.main,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },
  dragDisableButton: {
    position: 'absolute',
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: 'rgba(239, 255, 55, 0.3)',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    borderStyle: 'dashed',
    zIndex: -1,
  },
  dragEnableText: {
    fontSize: 26,
    fontWeight: '700',
  },
  dragDisableText: {
    color: 'rgba(239, 255, 55, 0.3)',
    fontSize: 26,
    fontWeight: '700',
  },
});

import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { useDispatch } from 'react-redux';
import { initializeAuthState, verifyToken } from '@/features/reducers/authReducer';
import { jwtDecode } from 'jwt-decode';

const OnBoarding = () => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await verifyToken('user-token');
      if (token) {
        router.replace('/(root)/(tabs)/home');
        dispatch(initializeAuthState({ userToken: token, user: jwtDecode(token) }));
      } else {
        setLoading(false);
        dispatch(initializeAuthState({ userToken: null, user: null }));
      }
    };

    checkToken();
  }, [dispatch]);

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  if (loading) {
    return (
      <SafeAreaView className='flex h-full items-center justify-center bg-white'>
        <ActivityIndicator size="large" color="#0286FF" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className='flex h-full items-center justify-between bg-white'>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className='w-full flex justify-end items-end p-5'
      >
        <Text className='text-black text-md font-JakartaBold'>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0]' />}
        activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className='flex items-center justify-center p-5' key={item.id}>
            <Image
              source={item.image}
              className='w-full h-[300px]'
              resizeMode='contain'
            />
            <View className='flex flex-row items-center justify-center w-full mt-10'>
              <Text className='text-black text-3xl font-bold mx-10 text-center'>{item.title}</Text>
            </View>
            <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'>{item.description}</Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
        className='w-11/12 my-10'
      />

    </SafeAreaView>
  )
}

export default OnBoarding